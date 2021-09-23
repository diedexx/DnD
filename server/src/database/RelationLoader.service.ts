import { Injectable } from "@nestjs/common";
import { castArray, flatMap, get, groupBy, intersection, isArray, uniq } from "lodash";
import { Connection, FindConditions, In, ObjectLiteral, Repository } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

/* eslint-disable max-len */
@Injectable()
/**
 * Service for efficiently loading relations.
 */
export default class RelationLoaderService {
	/**
	 * Constructs a RelationLoaderService
	 *
	 * @param {Connection} connection The TypeORM connection to use.
	 */
	public constructor(
		private readonly connection: Connection,
	) {
	}

	/**
	 * Loads relations for a given collection of entities.
	 *
	 * @param {any[]} entities TypeORM entity or entities.
	 * @param {string[]} relations The relations to load.
	 *
	 * @returns {Promise<any[]>} The entity or entities with relations assigned.
	 */
	public async loadRelations<T>( entities: T[], relations: string[] ): Promise<T[]>

	/**
	 * Loads relations for a given entity.
	 *
	 * @param {any} entity TypeORM entity or entities.
	 * @param {string[]} relations The relations to load.
	 *
	 * @returns {Promise<any>} The entity with relations assigned.
	 */
	public async loadRelations<T>( entity: T, relations: string[] ): Promise<T>;

	/**
	 * Loads relations for a given entity or collection of entities.
	 *
	 * @param {any} entities TypeORM entity or entities.
	 * @param {string[]} relations The relations to load.
	 *
	 * @returns {Promise<any | any[]>} The entity or entities with relations assigned.
	 */
	public async loadRelations<T>( entities: T| T[], relations: string[] ): Promise<T | T[]> {
		if ( ! entities ) {
			return entities;
		}

		// Immediately return if we don't have to load any relations.
		if ( relations.length === 0 ) {
			return entities;
		}

		const wasSingle = ! isArray( entities );
		entities = castArray( entities );

		if ( entities.length === 0 ) {
			return [];
		}

		// Prevent loading relations multiple times.
		relations = uniq( relations );

		// First get the direct relations with their own nested relations so we can load them recursively.
		const directRelations = this.getDirectRelations( relations );
		const entityName      = entities[ 0 ].constructor.name;
		const metadata        = this.connection.getMetadata( entityName );
		const promises        = [];

		for ( const relation in directRelations ) {
			if ( ! Object.prototype.hasOwnProperty.call( directRelations, relation ) ) {
				continue;
			}

			const relationMetadata = metadata.relations.find( r => r.propertyName === relation );

			if ( ! relationMetadata ) {
				console.error( `Attempting to load relation ${ relation } onto ${ entityName } but the relation is not defined!` );
				throw new Error( `Attempting to load relation ${ relation } onto ${ entityName } but the relation is not defined!` );
			}

			// Create promises so we can load all relations at the same time.
			const promise = this.loadRelationFromMetadata<T>( entities, relationMetadata )
				.then( relatedEntities => {
					const nestedRelations = directRelations[ relation ];
					if ( nestedRelations.length > 0 ) {
						return this.loadRelations( relatedEntities, nestedRelations );
					}
					return relatedEntities;
				} )
				.then( relatedEntities => {
					this.assignRelationFromMetadata<T>( entities as T[], relatedEntities as ObjectLiteral[], relationMetadata );
				} );
			promises.push( promise );
		}

		await Promise.all( promises );

		if ( wasSingle ) {
			return entities[ 0 ];
		}
		return entities;
	}

	/**
	 * Splits the relations into direct relations and nested relations.
	 *
	 * @param {string[]} relations The relations
	 *
	 * @returns {Object.<string, string[]>} The direct relations as keys and nested relations as values.
	 */
	protected getDirectRelations( relations: string[] ): { string?: string[] } {
		const directRelations = {};
		for ( const relation of relations ) {
			const splitRelation  = relation.split( "." );
			const directRelation = splitRelation.shift();

			if ( ! directRelations[ directRelation ] ) {
				directRelations[ directRelation ] = [];
			}

			if ( splitRelation.length > 0 ) {
				directRelations[ directRelation ].push( splitRelation.join( "." ) );
			}
		}

		return directRelations;
	}

	/**
	 * Loads a single relation using TypeORM metadata.
	 *
	 * @param {any[]} entities The TypeORM entities to load the relation for.
	 * @param {RelationMetadata} relationMetadata The metadata of the relation to load.
	 *
	 * @returns {Promise<any[]>} The related entities.
	 */
	protected async loadRelationFromMetadata<T>(
		entities: T[],
		relationMetadata: RelationMetadata,
	): Promise<T[]> {
		const relationRepository: Repository<T> = this.connection.getRepository( relationMetadata.type );
		let findConditions: FindConditions<T> = {};

		if ( relationMetadata.isManyToMany ) {
			const manyToManyFindConditions = await this.getManyToManyFindConditionsFromMetadata( entities, relationMetadata );
			if ( manyToManyFindConditions === false ) {
				return [];
			}
			findConditions = manyToManyFindConditions;
		} else {
			const columns = relationMetadata.isOwning ? relationMetadata.joinColumns : relationMetadata.inverseRelation.joinColumns;
			for ( const joinColumn of columns ) {
				const propertyName        = relationMetadata.isOwning ? joinColumn.propertyName : joinColumn.referencedColumn.propertyName;
				const relatedPropertyName = relationMetadata.isOwning ? joinColumn.referencedColumn.propertyName : joinColumn.propertyName;
				const foreignKeys         = uniq( entities.map( e => e[ propertyName ] ).filter( e => e ) );

				if ( foreignKeys.length === 0 ) {
					return [];
				}

				findConditions[ relatedPropertyName ] = In( foreignKeys );
			}
		}

		return relationRepository.find( findConditions );
	}

	/**
	 * Gets find conditions for a many to many relation using TypeORM metadata.
	 *
	 * @param {any[]} entities The TypeORM entities to load the relation for.
	 * @param {RelationMetadata} relationMetadata The metadata of the relation to load.
	 *
	 * @returns {Promise<FindConditions<any>>} The find conditions.
	 */
	protected async getManyToManyFindConditionsFromMetadata<T>(
		entities: T[],
		relationMetadata: RelationMetadata,
	): Promise<FindConditions<T> | false> {
		const joinWhere: string[] = [];
		const joinVars: { string?: string[] } = {};
		const { joinTableName, joinColumns, inverseJoinColumns } = this.getManyToManyJoinDataFromRelationMetadata( relationMetadata );

		for ( const joinColumn of joinColumns ) {
			const foreignKeys = entities.map( e => e[ joinColumn.referencedColumn.propertyName ] ).filter( e => e );

			if ( foreignKeys.length === 0 ) {
				return false;
			}

			joinWhere.push( `join.${joinColumn.databaseName} IN (:...${joinColumn.propertyName})` );
			joinVars[ joinColumn.propertyName ] = foreignKeys;
		}

		const joinEntities = await this.connection.createQueryBuilder()
			.select( "join" )
			.from( joinTableName, "join" )
			.where( joinWhere.join( " AND " ), joinVars )
			.getRawMany();

		this.assignForeignKeysFromMetadata( entities, joinEntities, relationMetadata );

		const findConditions: FindConditions<T> = {};
		for ( const joinColumn of inverseJoinColumns ) {
			const foreignKeys = uniq( joinEntities.map( e => e[ `join_${joinColumn.propertyName}` ] ).filter( e => e ) );

			if ( foreignKeys.length === 0 ) {
				return false;
			}

			findConditions[ joinColumn.referencedColumn.propertyName ] = In( foreignKeys );
		}
		return findConditions;
	}

	/**
	 * Assigns loaded relation entities to entities based on TypeORM relation metadata.
	 *
	 * @param {any[]} entities The TypeORM entities to assign the relations to.
	 * @param {any[]} joinEntities The related TypeORM join entities to base the foreign keys on.
	 * @param {RelationMetadata} relationMetadata The metadata of the relation to assign.
	 *
	 * @returns {any[]} The entities with new relations assigned.
	 */
	protected assignForeignKeysFromMetadata<T>(
		entities: T[],
		joinEntities: ObjectLiteral[],
		relationMetadata: RelationMetadata,
	): T[] {
		const joinMap = {};
		const { joinColumns, inverseJoinColumns } = this.getManyToManyJoinDataFromRelationMetadata( relationMetadata );

		for ( const joinColumn of joinColumns ) {
			joinMap[ joinColumn.propertyName ] = groupBy( joinEntities, `join_${joinColumn.propertyName}` );
		}

		// Add join data to each entity so we can find the records to assign.
		for ( const entity of entities ) {
			const relatedJoinEntities = joinColumns
				.map( joinColumn => {
					return joinMap[ joinColumn.propertyName ][ entity[ joinColumn.referencedColumn.propertyName ] ] || [];
				} )
				.reduce( ( c1, c2 ) => intersection( c1, c2 ) );

			// If there's only one inverse join column just build an array of those properties.
			if ( inverseJoinColumns.length === 1 ) {
				const joinColumn = inverseJoinColumns[ 0 ];
				entity[ relationMetadata.propertyName + "Ids" ] = relatedJoinEntities.map( e => e[ `join_${joinColumn.propertyName}` ] ).filter( e => e );
				continue;
			}

			// If there are multiple build an array of objects with each property.
			entity[ relationMetadata.propertyName + "Ids" ] = relatedJoinEntities.map( e => {
				return inverseJoinColumns.reduce( ( obj, column ) => {
					obj[ column.referencedColumn.propertyName ] = e[ `join_${column.propertyName}` ];
					return obj;
				}, {} );
			} );
		}

		return entities;
	}

	/**
	 * Assigns loaded relation entities to entities based on TypeORM relation metadata.
	 *
	 * @param {any[]} entities The TypeORM entities to assign the relations to.
	 * @param {any[]} relatedEntities The related TypeORM entities to assign.
	 * @param {RelationMetadata} relationMetadata The metadata of the relation to assign.
	 *
	 * @returns {any[]} The entities with new relations assigned.
	 */
	protected assignRelationFromMetadata<T>(
		entities: T[],
		relatedEntities: ObjectLiteral[],
		relationMetadata: RelationMetadata,
	): T[] {
		if ( relationMetadata.isManyToMany ) {
			return this.assignManyToManyRelationFromMetadata<T>( entities, relatedEntities, relationMetadata );
		}

		let columns, propertyNamePath, relatedPropertyNamePath;
		if ( relationMetadata.isOwning ) {
			columns = relationMetadata.joinColumns;
			propertyNamePath = "propertyName";
			relatedPropertyNamePath = "referencedColumn.propertyName";
		} else {
			columns = relationMetadata.inverseRelation.joinColumns;
			propertyNamePath = "referencedColumn.propertyName";
			relatedPropertyNamePath = "propertyName";
		}

		const joinMap = {};
		for ( const joinColumn of columns ) {
			const propertyName        = get( joinColumn, propertyNamePath );
			const relatedPropertyName = get( joinColumn, relatedPropertyNamePath );
			joinMap[ propertyName ]   = groupBy( relatedEntities, relatedPropertyName );
		}

		for ( const entity of entities ) {
			const relatedEntitiesToThisEntity = columns
				.map( joinColumn => {
					const propertyName = get( joinColumn, propertyNamePath );
					return joinMap[ propertyName ][ entity[ propertyName ] ] || [];
				} )
				.reduce( ( c1, c2 ) => intersection( c1, c2 ) );

			if ( relationMetadata.isOneToOne || relationMetadata.isManyToOne ) {
				entity[ relationMetadata.propertyName ] = relatedEntitiesToThisEntity[ 0 ] || null;
				continue;
			}
			entity[ relationMetadata.propertyName ] = relatedEntitiesToThisEntity;
		}

		return entities;
	}

	/**
	 * Assigns loaded relation entities to entities based on TypeORM relation metadata for a many-to-many relation.
	 *
	 * @param {any[]} entities The TypeORM entities to assign the relations to.
	 * @param {any[]} relatedEntities The related TypeORM entities to assign.
	 * @param {RelationMetadata} relationMetadata The metadata of the relation to assign.
	 *
	 * @returns {any[]} The entities with new relations assigned.
	 */
	protected assignManyToManyRelationFromMetadata<T>(
		entities: T[],
		relatedEntities: ObjectLiteral[],
		relationMetadata: RelationMetadata,
	): T[] {
		const { joinColumns, inverseJoinColumns } = this.getManyToManyJoinDataFromRelationMetadata( relationMetadata );

		if ( inverseJoinColumns.length === 1 ) {
			const joinColumn    = inverseJoinColumns[ 0 ];
			const simpleJoinMap = groupBy( relatedEntities, joinColumn.referencedColumn.propertyName );

			for ( const entity of entities ) {
				entity[ relationMetadata.propertyName ] = flatMap( entity[ relationMetadata.propertyName + "Ids" ], id => simpleJoinMap[ id ] );
			}
			return entities;
		}

		const complexJoinMap = {};
		for ( const joinColumn of inverseJoinColumns ) {
			complexJoinMap[ joinColumn.referencedColumn.propertyName ] = groupBy( relatedEntities, joinColumn.referencedColumn.propertyName );
		}

		for ( const entity of entities ) {
			entity[ relationMetadata.propertyName ] = joinColumns
				.map( joinColumn => {
					return entity[ relationMetadata.propertyName + "Ids" ]
						.map( obj => obj[ joinColumn.referencedColumn.propertyName ] )
						.map( id => complexJoinMap[ joinColumn.propertyName ][ id ] );
				} )
				.reduce( ( c1, c2 ) => intersection( c1, c2 ) );
		}

		return entities;
	}

	/**
	 * Returns the correct join columns from TypeORM relation metadata.
	 *
	 * @param {RelationMetadata} relationMetadata The relation metadata.
	 *
	 * @returns {Object.<string, string>} The join table name, join columns and inverse join columns.
	 */
	protected getManyToManyJoinDataFromRelationMetadata(
		relationMetadata: RelationMetadata,
	): { joinTableName: string; joinColumns: ColumnMetadata[]; inverseJoinColumns: ColumnMetadata[] } {
		let joinTableName, joinColumns, inverseJoinColumns;
		if ( relationMetadata.joinTableName ) {
			joinTableName = relationMetadata.joinTableName;
			joinColumns = relationMetadata.joinColumns;
			inverseJoinColumns = relationMetadata.inverseJoinColumns;
		} else {
			joinTableName = relationMetadata.inverseRelation.joinTableName;
			joinColumns = relationMetadata.inverseRelation.inverseJoinColumns;
			inverseJoinColumns = relationMetadata.inverseRelation.joinColumns;
		}
		return { joinTableName, joinColumns, inverseJoinColumns };
	}
}
/* eslint-enable max-len */
