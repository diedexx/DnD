import { Type } from "@nestjs/common";
import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

/**
 * Creates a basic find all and find single resolver abstract class.
 *
 * @param {T} classRef The class for which the resolver is.
 * @param {string} singularName The singular name of the entity in GraphQL.
 * @param {string} pluralName The plural name of the entity in GraphQL.
 *
 * @return {BaseResolverHost} The resolver.
 */
export default function BaseResolver<T extends Type<unknown>>( classRef: T, singularName: string, pluralName: string ): any {
	@Resolver( { isAbstract: true } )
	abstract class BaseResolverHost {
		/**
		 * The constructor.
		 *
		 * @protected
		 *
		 * @param {Repository<T>} repository The repository for the class.
		 */
		protected constructor(
			@InjectRepository( classRef )
			private readonly repository: Repository<T>,
		) {
		}

		/**
		 * Gets all entities of the class.
		 *
		 * @return {Promise<T[]>} All found entities.
		 */
		@Query( () => [ classRef ], { name: pluralName } )
		public async getAll(): Promise<T[]> {
			return await this.repository.find();
		}

		/**
		 * Finds a single entity of the class.
		 *
		 * @param {number} id The id of the entity to find.
		 *
		 * @return {Promise<T>} The found entity.
		 */
		@Query( () => classRef, { name: singularName } )
		public async getSingle( @Args( "id", { type: () => Int } ) id: number ): Promise<T> {
			return this.repository.findOne( id );
		}
	}

	return BaseResolverHost;
}
