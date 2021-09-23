import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../Base.resolver";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";

@Resolver( () => Character )
export default class CharacterResolver extends BaseResolver( Character, "character", "characters" ) {
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
		super( characterRepository );
	}

	/**
	 * Resolve the class relationship.
	 *
	 * @param {Character} character The character to get the class for.
	 *
	 * @return {Promise<CharacterClass>} The characterClass of the character.
	 */
	@ResolveField( "class", () => CharacterClass )
	public async getCharacterClass( @Parent() character: Character ): Promise<CharacterClass> {
		return ( await this.relationLoaderService.loadRelations( character, [ "class" ] ) ).class;
	}
}
