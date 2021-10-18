import { Injectable } from "@nestjs/common";
import AbilityScoreService from "../ability/AbilityScore.service";
import RelationLoaderService from "../database/RelationLoader.service";
import Modifier from "../modifier/values/Modifier.value";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import Skill from "./entities/Skill.entity";
import SkillScore from "./entities/SkillScore.entity";

@Injectable()
export default class SkillScoreService {
	/**
	 * The constructor.
	 *
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 * @param {ModifierOrchestratorService} modifierOrchestratorService A service that resolves external modifiers.
	 * @param {AbilityScoreService} abilityScoreService A service for managing abilityScores.
	 */
	public constructor(
		private readonly relationLoaderService: RelationLoaderService,
		private readonly modifierOrchestratorService: ModifierOrchestratorService,
		private readonly abilityScoreService: AbilityScoreService,
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
		const baseModifier: Modifier = await this.getSkillScoreBaseModifier( skillScore );
		return this.modifierOrchestratorService.applySkillScoreModifiers( baseModifier, skillScore );
	}

	/**
	 * Gets the base modifier score without external modifiers for a skillScore.
	 *
	 * @param {SkillScore} skillScore The skillScore to get the modifier base for.
	 *
	 * @return {Promise<Modifier>} The skillScore base modifier.
	 *
	 * @private
	 */
	private async getSkillScoreBaseModifier( skillScore: SkillScore ): Promise<Modifier> {
		const skill: Skill = ( await this.relationLoaderService.loadRelations( skillScore, [ "skill" ] ) ).skill;
		return await this.abilityScoreService.getAbilityScoreModifier( skill.abilityId, skillScore.characterId );
	}
}
