import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";

@Resolver( () => Character )
export default class CharacterResolver {
	/**
	 * The constructor.
	 *
	 * @param {Repository<CharacterClass>} characterRepository The Character repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		private readonly relationLoaderService: RelationLoaderService,
	) {
	}

	/**
	 * Gets a single Character.
	 *
	 * @param {number} id The id of the Character to retrieve.
	 *
	 * @return {Promise<Character|null>} The Character.
	 */
	@Query( () => Character )
	public async character( @Args( "id", { type: () => Int } ) id: number ) {
		return this.characterRepository.findOne( id );
	}

	/**
	 * Resolve the class relationship.
	 *
	 * @param {Character} character The character to get the class for.
	 *
	 * @return {Promise<CharacterClass>} The characterClass of the character.
	 */
	@ResolveField( "class" )
	public async class( @Parent() character: Character ): Promise<CharacterClass> {
		return ( await this.relationLoaderService.loadRelations( character, [ "class" ] ) ).class;
	}
}
