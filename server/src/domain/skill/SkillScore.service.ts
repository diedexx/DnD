import { Injectable } from "@nestjs/common";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import Modifier from "../modifier/values/Modifier.value";
import SkillScore from "./entities/SkillScore.entity";

@Injectable()
export default class SkillScoreService {
	/**
	 * The constructor.
	 *
	 * @param {ModifierOrchestratorService} modifierOrchestratorService A service that resolves external modifiers.
	 */
	public constructor(
		private readonly modifierOrchestratorService: ModifierOrchestratorService,
	) {
	}

	/**
	 * Gets the modifier score with external modifiers for a skillScore.
	 *z
	 * @param {SkillScore} skillScore The skillScore to get the modifier for.
	 *
	 * @return {Promise<Modifier>} The skillScore modifier.
	 */
	public async getSkillScoreModifier( skillScore: SkillScore ): Promise<Modifier> {
		const baseModifier: Modifier = new Modifier();

		return this.modifierOrchestratorService.applySkillScoreModifiers( baseModifier, skillScore );
	}
}
