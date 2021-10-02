import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import AbilityScoreService from "../ability/AbilityScore.service";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import Health from "./models/Health.valueobject";
import CreateCharacterType, { AbilityScoreType } from "./types/CreateCharacter.type";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";

@Injectable()
export default class CharacterService {
	/**
	 * The constructor.
	 *
	 * @param {Repository<Character>} characterRepository The character repo.
	 * @param {Repository<CharacterClass>} characterClassRepository The characterClass repo.
	 * @param {AbilityScoreService} abilityScoreService A service for managing abilityScores.
	 */
	public constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		@InjectRepository( CharacterClass )
		private readonly characterClassRepository: Repository<CharacterClass>,
		private readonly abilityScoreService: AbilityScoreService,
	) {
	}

	/**
	 * Creates a new character.
	 *
	 * @param {CreateCharacterType} args The args.
	 *
	 * @return {Promise<Character>} The new character.
	 */
	public async createCharacter( args: CreateCharacterType ): Promise<Character> {
		const character = new Character();
		character.name = args.name;
		character.class = await this.characterClassRepository.findOne( args.classId );
		character.race = args.race;
		character.health = new Health( args.maxHealth );
		character.alignment = args.alignment;
		character.bonds = args.bonds;
		character.background = args.background;
		character.personalityTraits = args.personalityTraits;
		character.flaws = args.flaws;
		character.ideals = args.ideals;
		character.abilityScores = await Promise.all(
			args.abilityScores.map( async ( abilityScore: AbilityScoreType ): Promise<AbilityScore> =>
				await this.abilityScoreService.createAbilityScore( { character, ...abilityScore } ),
			),
		);
		return character;
	}
}
