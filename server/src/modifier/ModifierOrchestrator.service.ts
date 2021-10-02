import { Injectable } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
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
	 */
	public constructor(
		private readonly modifierCollectorService: ModifierCollectorService,
	) {
	}

	/**
	 * Applies all attack roll modifiers.
	 *
	 * @param {Modifier} base The base modifier to apply external modifiers to.
	 * @param {Character} character The character to apply modifiers for.
	 * @param {object} weapon The weapon that is used for the attack roll.
	 *
	 * @return {Promise<Modifier>} The modifier with applied external modifiers.
	 */
	public async applyAttackRollModifiers( base: Modifier, character: Character, weapon: any ): Promise<Modifier> {
		const externalModifiers: ExternalModifier[] = await new ModifierListBuilder( this.modifierCollectorService )
			.applyWeaponModifier( weapon )
			.applyGearModifiers( character )
			.filterTypes( ModificationTypesType.ATTACK_ROLL )
			.build();

		base.addExternalModifier( ...externalModifiers );
		return base;
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

		base.addExternalModifier( ...externalModifiers );
		return base;
	}
}
