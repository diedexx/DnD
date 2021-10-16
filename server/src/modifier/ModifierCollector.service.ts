import { Injectable } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import RelationLoaderService from "../database/RelationLoader.service";
import Proficiency from "../proficiency/entities/Proficiency.entity";
import { ProficiencyService } from "../proficiency/Proficiency.service";
import { Weapon } from "../weapon/entities/Weapon.entity";
import ExternalModifier from "./models/ExternalModifier.valueobject";
import Modifier from "./models/Modifier.valueobject";
import ModificationTypesType from "./types/ModificationTypes.type";

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
				ModificationTypesType.ARMOR_CLASS,
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
		return [
			new ExternalModifier(
				"Fancy halberd",
				ModificationTypesType.ATTACK_ROLL,
				new Modifier( 2 ),
				true,
				"Deal extra dmg to undead targets",
			),
		];
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
					weapon.name,
					ModificationTypesType.ATTACK_ROLL,
					proficiency.bonus,
					false,
					proficiency.description,
				),
			];
		} catch ( e ) {
			return [];
		}
	}

	/* eslint-enable */

	/**
	 * Gathers a list of external modifiers that skill proficiency gives.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherSkillProficiencyModifiers(): Promise<ExternalModifier[]> {
		return [
			new ExternalModifier(
				"Proficiency",
				ModificationTypesType.SKILL,
				new Modifier( 2 ),
				false,
				"You are proficient at this skill",
			),
		];
	}

	/**
	 * Gathers a list of external modifiers that saving throw proficiency gives.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherSavingThrowProficiencyModifiers(): Promise<ExternalModifier[]> {
		return [
			new ExternalModifier(
				"Proficiency",
				ModificationTypesType.SAVING_THROW,
				new Modifier( 2 ),
				false,
				"You are proficient at this saving throw",
			),
		];
	}
}
