import { Injectable } from "@nestjs/common";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import Modifier from "../modifier/values/Modifier.value";
import { Weapon } from "./entities/Weapon.entity";

@Injectable()
export default class WeaponService {
	/**
	 * The constructor.
	 *
	 * @param {ModifierOrchestratorService} modifierOrchestratorService A service that handles modifiers.
	 */
	public constructor(
		private readonly modifierOrchestratorService: ModifierOrchestratorService,
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
		return this.modifierOrchestratorService.applyAttackRollModifiers( new Modifier(), weapon );
	}
}
