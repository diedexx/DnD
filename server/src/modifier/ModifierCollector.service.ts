import { Injectable } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import RelationLoaderService from "../database/RelationLoader.service";
import Proficiency from "../proficiency/entities/Proficiency.entity";
import { ProficiencyService } from "../proficiency/Proficiency.service";
import SavingThrow from "../savingthrow/entities/SavingThrow.entity";
import SkillScore from "../skill/entities/SkillScore.entity";
import { Weapon } from "../weapon/entities/Weapon.entity";
import Modification from "./entities/Modification.entity";
import ModificationTypes from "./types/ModificationTypes.type";
import ExternalModifier from "./values/ExternalModifier.value";
import Modifier from "./values/Modifier.value";

@Injectable()
export class ModifierCollectorService {
	/**
	 * The constructor.
	 *
	 * @param {ProficiencyService} proficiencyService A service that knows about proficiencies.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	public constructor(
		private readonly proficiencyService: ProficiencyService,
		private readonly relationLoaderService: RelationLoaderService,
	) {
	}

	/* eslint-disable @typescript-eslint/no-unused-vars */
	/**
	 * Gathers a list of external modifiers that all owned gear gives.
	 *
	 * @param {Character} character The character that owns the gear.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherGearModifiers( character: Character ): Promise<ExternalModifier[]> {
		// This.equipmentModifierService.gatherModifiers(),
		return [
			new ExternalModifier(
				"Chest plate of destruction",
				ModificationTypes.ARMOR_CLASS,
				new Modifier( 1 ),
				false,
			),
		];
	}

	/**
	 * Gathers a list of external modifiers that a weapon gives.
	 *
	 * @param {Weapon} weapon The weapon to get modifiers for.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherWeaponModifiers( weapon: Weapon ): Promise<ExternalModifier[]> {
		// This.equipmentModifierService.gatherModifiers(), This does query to database
		const bonuses = ( await this.relationLoaderService.loadRelations( weapon, [ "bonuses.sourceWeapon" ] ) ).bonuses;
		return bonuses.map( ( bonus: Modification ): ExternalModifier => bonus.externalModifier );
	}

	/* eslint-enable */

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
					weapon.name,
					ModificationTypes.ATTACK_ROLL,
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
				ModificationTypes.SKILL,
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
				ModificationTypes.SAVING_THROW,
				new Modifier( 2 ),
				false,
				"You are proficient at this saving throw",
			),
		];
	}
}
