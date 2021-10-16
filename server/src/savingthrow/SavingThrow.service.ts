import { Injectable } from "@nestjs/common";
import AbilityScoreService from "../ability/AbilityScore.service";
import Modifier from "../modifier/models/Modifier.valueobject";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import SavingThrow from "./entities/SavingThrow.entity";

@Injectable()
export default class SavingThrowService {
	/**
	 * The constructor.
	 *
	 * @param {ModifierOrchestratorService} modifierOrchestratorService A service that resolves external modifiers.
	 * @param {AbilityScoreService} abilityScoreService A service for managing abilityScores.
	 */
	public constructor(
		private readonly modifierOrchestratorService: ModifierOrchestratorService,
		private readonly abilityScoreService: AbilityScoreService,
	) {
	}

	/**
	 * Gets the modifier score with external modifiers for a savingThrow.
	 *z
	 * @param {SavingThrow} savingThrow The savingThrow to get the modifier for.
	 *
	 * @return {Promise<Modifier>} The savingThrow modifier.
	 */
	public async getSavingThrowModifier( savingThrow: SavingThrow ): Promise<Modifier> {
		const baseModifier: Modifier = await this.getSavingThrowBaseModifier( savingThrow );
		return this.modifierOrchestratorService.applySavingThrowModifiers( baseModifier, savingThrow );
	}

	/**
	 * Gets the base modifier score without external modifiers for a savingThrow.
	 *
	 * @param {SavingThrow} savingThrow The savingThrow to get the modifier base for.
	 *
	 * @return {Promise<Modifier>} The savingThrow base modifier.
	 *
	 * @private
	 */
	private async getSavingThrowBaseModifier( savingThrow: SavingThrow ): Promise<Modifier> {
		return await this.abilityScoreService.getAbilityScoreModifier( savingThrow.abilityId, savingThrow.characterId );
	}
}
