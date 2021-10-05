import { Injectable } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import { Weapon } from "../weapon/entities/Weapon.entity";
import ExternalModifier from "./models/ExternalModifier.valueobject";
import Modifier from "./models/Modifier.valueobject";
import ModificationTypesType from "./types/ModificationTypes.type";

@Injectable()
export class ModifierCollectorService {
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
	 * @param {Character} character The character that owns the weapon.
	 * @param {Weapon} weapon The weapon to get proficiency bonus for.
	 *
	 * @return {Promise<ExternalModifier[]>} The list of external modifiers.
	 */
	public async gatherWeaponProficiencyModifiers( character: Character, weapon: Weapon ): Promise<ExternalModifier[]> {
		return [
			new ExternalModifier(
				"Proficiency",
				ModificationTypesType.ATTACK_ROLL,
				new Modifier( 2 ),
				false,
				"You are proficient with this type of weapon",
			),
		];
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
}
