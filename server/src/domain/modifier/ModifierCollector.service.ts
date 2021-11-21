import { Injectable } from "@nestjs/common";
import AbilityScoreService from "../ability/AbilityScore.service";
import Ability from "../ability/entities/Ability.entity";
import AbilityScoreModifier from "../ability/values/AbilityScoreModifier.value";
import Character from "../character/entities/Character.entity";
import RelationLoaderService from "../../infrastructure/database/RelationLoader.service";
import Equipment from "../equipment/entities/Equipment.entity";
import Proficiency from "../proficiency/entities/Proficiency.entity";
import { ProficiencyService } from "../proficiency/Proficiency.service";
import SavingThrow from "../savingthrow/entities/SavingThrow.entity";
import SkillScore from "../skill/entities/SkillScore.entity";
import { Weapon } from "../weapon/entities/Weapon.entity";
import Modification from "./entities/Modification.entity";
import ModificationType from "./types/ModificationType.type";
import ExternalModifier from "./values/ExternalModifier.value";
import Modifier from "./values/Modifier.value";
import WeaponModifierService from "./WeaponModifier.service";

@Injectable()
export class ModifierCollectorService {
	/**
	 * The constructor.
	 *
	 * @param {ProficiencyService} proficiencyService A service that knows about proficiencies.
	 * @param {WeaponModifierService} weaponModifierService A service that knows about weapon modifiers.
	 * @param {AbilityScoreService} abilityScoreService A service that knows about AbilityScores.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	public constructor(
		private readonly proficiencyService: ProficiencyService,
		private readonly weaponModifierService: WeaponModifierService,
		private readonly abilityScoreService: AbilityScoreService,
		private readonly relationLoaderService: RelationLoaderService,
	) {
	}

	/* eslint-disable @typescript-eslint/no-unused-vars */
	/**
	 * Gathers a list of external modifiers that all owned equipment gives.
	 *
	 * @param {Character} character The character that owns the equipment.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherEquipmentModifiers( character: Character ): Promise<ExternalModifier[]> {
		const equipment: Equipment[] = (
			await this.relationLoaderService.loadRelations( character, [ "equipment.bonuses.sourceEquipment" ] )
		).equipment;

		return equipment.flatMap(
			( equipmentPiece: Equipment ): ExternalModifier[] => equipmentPiece.bonuses.map(
				( bonus: Modification ): ExternalModifier => bonus.externalModifier ),
		);
	}

	/**
	 * Gathers a list of external modifiers that a weapon gives.
	 *
	 * @param {Weapon} weapon The weapon to get modifiers for.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherWeaponModifiers( weapon: Weapon ): Promise<ExternalModifier[]> {
		const bonuses = ( await this.relationLoaderService.loadRelations( weapon, [ "bonuses.sourceWeapon" ] ) ).bonuses;
		return bonuses.map( ( bonus: Modification ): ExternalModifier => bonus.externalModifier );
	}

	/* eslint-enable */

	/**
	 * Gathers the modifiers that ability modifiers give for a specific weapon attack.
	 *
	 * @param {Weapon} weapon The weapon to get the ability modifiers for.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherAttackRollAbilityModifier( weapon: Weapon ): Promise<ExternalModifier[]> {
		try {
			const abilities: Ability[] = await this.weaponModifierService.getAttackRollAbilities( weapon );

			const abilityScoreModifiers: AbilityScoreModifier[] = await Promise.all( abilities.map(
				async ( ability: Ability ) => await this.abilityScoreService.getAbilityScoreModifier( ability.id, weapon.ownerId ),
			) );

			const highestAbilityScoreModifier = abilityScoreModifiers
				.sort( ( a, b ) => a.value - b.value )
				.pop();

			return [
				new ExternalModifier(
					abilities.map( ability => ability.name ).join( "/" ),
					ModificationType.ATTACK_ROLL,
					highestAbilityScoreModifier,
					false,
					"Attack ability modifier",
				),
			];
		} catch ( e ) {
			return [];
		}
	}

	/**
	 * Gathers a list of external modifiers that weapon proficiency gives.
	 *
	 * @param {Weapon} weapon The weapon to get proficiency bonus for.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherWeaponProficiencyModifiers( weapon: Weapon ): Promise<ExternalModifier[]> {
		try {
			const proficiency: Proficiency = await this.proficiencyService.getWeaponProficiency( weapon );
			return [
				new ExternalModifier(
					"Proficiency",
					ModificationType.ATTACK_ROLL,
					proficiency.bonus,
					false,
					proficiency.description,
				),
			];
		} catch ( e ) {
			return [];
		}
	}

	/**
	 * Gathers a list of external modifiers that an ability gives a skillScore.
	 *
	 * @param {SkillScore} skillScore The skillScore to apply the ability modifiers to.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherSkillScoreAbilityModifiers( skillScore: SkillScore ): Promise<ExternalModifier[]> {
		const { skill } = await this.relationLoaderService.loadRelations( skillScore, [ "skill.ability" ] );
		const modifier = await this.abilityScoreService.getAbilityScoreModifier( skill.abilityId, skillScore.characterId );
		return [
			new ExternalModifier(
				skill.ability.name,
				ModificationType.SKILL,
				modifier,
				false,
				"Ability score",
			),
		];
	}
	/**
	 * Gathers a list of external modifiers that skill proficiency gives.
	 *
	 * @param {SkillScore} skillScore The skillScore to apply the proficiency bonus to.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherSkillProficiencyModifiers( skillScore: SkillScore ): Promise<ExternalModifier[]> {
		if ( ! skillScore.isProficient ) {
			return [];
		}

		return [
			new ExternalModifier(
				"Proficiency",
				ModificationType.SKILL,
				new Modifier( 2 ),
				false,
				"You are proficient at this skill",
			),
		];
	}

	/**
	 * Gathers a list of external modifiers that saving throw proficiency gives.
	 *
	 * @param {SkillScore} savingThrow The savingThrow to apply the proficiency bonus to.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherSavingThrowProficiencyModifiers( savingThrow: SavingThrow ): Promise<ExternalModifier[]> {
		if ( ! savingThrow.isProficient ) {
			return [];
		}

		return [
			new ExternalModifier(
				"Proficiency",
				ModificationType.SAVING_THROW,
				new Modifier( 2 ),
				false,
				"You are proficient at this saving throw",
			),
		];
	}
}
