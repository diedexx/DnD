import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import AbilityScoreService from "../ability/AbilityScore.service";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import ModificationType from "../modifier/types/ModificationType.type";
import Modifier from "../modifier/values/Modifier.value";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";
import CreateCharacterType, { AbilityScoreType } from "./types/CreateCharacter.type";
import Health from "./values/Health.value";

@Injectable()
export default class CharacterService {
	/**
	 * The constructor.
	 *
	 * @param {Repository<Character>} characterRepository The character repo.
	 * @param {Repository<CharacterClass>} characterClassRepository The characterClass repo.
	 * @param {AbilityScoreService} abilityScoreService A service for managing abilityScores.
	 * @param {ModifierOrchestratorService} modifierOrchestratorService A service that knows about modifiers.
	 */
	public constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		@InjectRepository( CharacterClass )
		private readonly characterClassRepository: Repository<CharacterClass>,
		private readonly abilityScoreService: AbilityScoreService,
		private readonly modifierOrchestratorService: ModifierOrchestratorService,
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

	/**
	 * Gets the armor class modifier.
	 *
	 * @param {Character} character The character to get the armor class modifier for.
	 *
	 * @return {Promise<Modifier>} The modifier.
	 */
	public async getArmorClassModifier( character: Character ): Promise<Modifier> {
		const base = new Modifier( character.baseArmorClass );
		return await this.modifierOrchestratorService.applyEquipmentModifiers( base, character, ModificationType.ARMOR_CLASS );
	}

	/**
	 * Gets the initiative modifier.
	 *
	 * @param {Character} character The character to get the initiative modifier for.
	 *
	 * @return {Promise<Modifier>} The modifier.
	 */
	public async getInitiativeModifier( character: Character ): Promise<Modifier> {
		const base = new Modifier( character.baseInitiative );
		return await this.modifierOrchestratorService.applyEquipmentModifiers( base, character, ModificationType.INITIATIVE );
	}

	/**
	 * Gets the speed modifier.
	 *
	 * @param {Character} character The character to get the speed modifier for.
	 *
	 * @return {Promise<Modifier>} The modifier.
	 */
	public async getSpeedModifier( character: Character ): Promise<Modifier> {
		const base = new Modifier( character.baseSpeed );
		return await this.modifierOrchestratorService.applyEquipmentModifiers( base, character, ModificationType.SPEED );
	}
}
