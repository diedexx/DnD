import { Injectable } from "@nestjs/common";
import RelationLoaderService from "../database/RelationLoader.service";
import Modifier from "../modifier/models/Modifier.valueobject";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import { Weapon } from "./entities/Weapon.entity";

@Injectable()
export default class WeaponService {
	/**
	 * The constructor.
	 */
	public constructor(
		private readonly modifierOrchestratorService: ModifierOrchestratorService,
		private readonly relationLoaderService: RelationLoaderService,
	) {
	}

	/**
	 * Gets the attack roll modifier with external modifiers for a weapon.
	 *
	 * @param {Weapon} weapon The weapon to get the attack roll modifier for.
	 *
	 * @return {Promise<Modifier>} The modifier.
	 */
	public async getAttackRollModifier( weapon: Weapon ): Promise<Modifier> {
		const owner = ( await this.relationLoaderService.loadRelations( weapon, [ "owner" ] ) ).owner;
		return this.modifierOrchestratorService.applyAttackRollModifiers( weapon.attackRollModifierBase, owner, weapon );
	}
}
