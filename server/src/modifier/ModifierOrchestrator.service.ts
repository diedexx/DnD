import { Injectable } from "@nestjs/common";
import RelationLoaderService from "../database/RelationLoader.service";
import SavingThrow from "../savingthrow/entities/SavingThrow.entity";
import SkillScore from "../skill/entities/SkillScore.entity";
import ExternalModifier from "./models/ExternalModifier.valueobject";
import Modifier from "./models/Modifier.valueobject";
import { ModifierCollectorService } from "./ModifierCollector.service";
import { ModifierListBuilder } from "./ModifierList.builder";
import ModificationTypesType from "./types/ModificationTypes.type";

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
			.applyWeaponModifier( weapon )
			.applyWeaponProficiencyModifiers( weapon )
			.applyGearModifiers( owner )
			.filterTypes( ModificationTypesType.ATTACK_ROLL )
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
			.applySkillProficiencyModifiers( skillScore )
			.filterTypes( ModificationTypesType.SKILL )
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
			.filterTypes( ModificationTypesType.SAVING_THROW )
			.build();

		return base.withExternalModifier( ...externalModifiers );
	}
}
