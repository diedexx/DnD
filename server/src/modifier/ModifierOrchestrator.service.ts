import { Injectable } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import RelationLoaderService from "../database/RelationLoader.service";
import SavingThrow from "../savingthrow/entities/SavingThrow.entity";
import SkillScore from "../skill/entities/SkillScore.entity";
import { ModifierCollectorService } from "./ModifierCollector.service";
import { ModifierListBuilder } from "./ModifierList.builder";
import ModificationType from "./types/ModificationType.type";
import ExternalModifier from "./values/ExternalModifier.value";
import Modifier from "./values/Modifier.value";

@Injectable()
export class ModifierOrchestratorService {
	/**
	 * The constructor.
	 *
	 * @param {ModifierCollectorService} modifierCollectorService A service which collects modifiers.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	public constructor(
		private readonly modifierCollectorService: ModifierCollectorService,
		private readonly relationLoaderService: RelationLoaderService,
	) {
	}

	/**
	 * Applies all attack roll modifiers.
	 *
	 * @param {Modifier} base The base modifier to apply external modifiers to.
	 * @param {object} weapon The weapon that is used for the attack roll.
	 *
	 * @return {Promise<Modifier>} The modifier with applied external modifiers.
	 */
	public async applyAttackRollModifiers( base: Modifier, weapon: any ): Promise<Modifier> {
		const owner = ( await this.relationLoaderService.loadRelations( weapon, [ "owner" ] ) ).owner;

		const externalModifiers: ExternalModifier[] = await new ModifierListBuilder( this.modifierCollectorService )
			.applyAttackRollAbilityModifier( weapon )
			.applyWeaponProficiencyModifiers( weapon )
			.applyWeaponModifiers( weapon )
			.applyEquipmentModifiers( owner )
			.filterTypes( ModificationType.ATTACK_ROLL )
			.build();

		return base.withExternalModifier( ...externalModifiers );
	}

	/**
	 * Applies equipment modifiers.
	 *
	 * @param {Modifier} base The base modifier to apply external modifiers to.
	 * @param {Character} character The character to apply equipment modifiers for.
	 * @param {ModificationType} type The type of modifier to get.
	 *
	 * @return {Promise<Modifier>} The modifier with applied external modifiers that match the type.
	 */
	public async applyEquipmentModifiers( base: Modifier, character: Character, type: ModificationType ): Promise<Modifier> {
		const externalModifiers: ExternalModifier[] = await new ModifierListBuilder( this.modifierCollectorService )
			.applyEquipmentModifiers( character )
			.filterTypes( type )
			.build();

		return base.withExternalModifier( ...externalModifiers );
	}

	/**
	 * Applies all skill score modifiers.
	 *
	 * @param {Modifier} base The base modifier to apply external modifiers to.
	 * @param {SkillScore} skillScore The skill score to apply modifiers for.
	 *
	 * @return {Promise<Modifier>} The modifier with applied external modifiers.
	 */
	public async applySkillScoreModifiers( base: Modifier, skillScore: SkillScore ): Promise<Modifier> {
		const externalModifiers: ExternalModifier[] = await new ModifierListBuilder( this.modifierCollectorService )
			.applySkillScoreAbilityModifiers( skillScore )
			.applySkillProficiencyModifiers( skillScore )
			.filterTypes( ModificationType.SKILL )
			.build();

		return base.withExternalModifier( ...externalModifiers );
	}

	/**
	 * Applies all saving throw modifiers.
	 *
	 * @param {Modifier} base The base modifier to apply external modifiers to.
	 * @param {SavingThrow} savingThrow The saving throw to apply modifiers for.
	 *
	 * @return {Promise<Modifier>} The modifier with applied external modifiers.
	 */
	public async applySavingThrowModifiers( base: Modifier, savingThrow: SavingThrow ): Promise<Modifier> {
		const externalModifiers: ExternalModifier[] = await new ModifierListBuilder( this.modifierCollectorService )
			.applySavingThrowProficiencyModifiers( savingThrow )
			.filterTypes( ModificationType.SAVING_THROW )
			.build();

		return base.withExternalModifier( ...externalModifiers );
	}
}
