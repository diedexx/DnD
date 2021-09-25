import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import BaseResolver from "../Base.resolver";
import RelationLoaderService from "../database/RelationLoader.service";
import CharacterService from "./Character.service";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";
import CreateAbilityScoreInputType from "./inputtypes/CreateAbilityScore.inputtype";
import CreateCharacterInputType from "./inputtypes/CreateCharacter.inputtype";
import CreateCharacterType from "./types/CreateCharacter.type";

@Resolver( () => Character )
export default class CharacterResolver extends BaseResolver( Character, "character", "characters" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<CharacterClass>} characterRepository The Character repo.
	 * @param {CharacterService} characterService A service that manages characters.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		private readonly characterService: CharacterService,
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

	/**
	 * Resolve the abilityScores relationship.
	 *
	 * @param {Character} character The character to get the abilityScores for.
	 *
	 * @return {Promise<CharacterClass>} The abilityScores of the character.
	 */
	@ResolveField( "abilityScores", () => [ AbilityScore ] )
	public async getAbilityScores( @Parent() character: Character ): Promise<AbilityScore[]> {
		return ( await this.relationLoaderService.loadRelations( character, [ "abilityScores" ] ) ).abilityScores;
	}

	/**
	 * Creates a new character.
	 * @param {CreateCharacterInputType} characterInput The character information.
	 * @param {CreateAbilityScoreInputType[]} abilityScoreInput The ability score information.
	 *
	 * @return {Promise<Character>} The new character.
	 */
	@Mutation( () => Character )
	async createCharacter(
		@Args( "character", { type: () => CreateCharacterInputType } ) characterInput: CreateCharacterInputType,
		@Args( "abilityScores", { type: () => [ CreateAbilityScoreInputType ] } ) abilityScoreInput: CreateAbilityScoreInputType[],
	): Promise<Character> {
		const args: CreateCharacterType = { ...characterInput, ...{ abilityScores: abilityScoreInput } };

		const character = await this.characterService.createCharacter( args );
		return this.characterRepository.save( character );
	}
}
