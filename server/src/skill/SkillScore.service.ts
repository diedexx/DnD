import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Ability from "../ability/entities/Ability.entity";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import RelationLoaderService from "../database/RelationLoader.service";
import Modifier from "../modifier/models/Modifier.valueobject";
import { ModifierOrchestratorService } from "../modifier/ModifierOrchestrator.service";
import SkillScore from "./entities/SkillScore.entity";

export default class SkillScoreService {
	/**
	 * The constructor.
	 *
	 * @param {Repository<AbilityScore>} abilityScoreRepository The AbilityScore repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 * @param {ModifierOrchestratorService} modifierOrchestratorService A service that resolves external modifiers.
	 */
	public constructor(
		@InjectRepository( AbilityScore )
		private readonly abilityScoreRepository: Repository<AbilityScore>,
		private readonly relationLoaderService: RelationLoaderService,
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
		const ability: Ability = ( await this.relationLoaderService.loadRelations( skillScore, [ "skill.ability" ] ) ).skill.ability;
		const abilityScore: AbilityScore = await this.abilityScoreRepository.findOne( { where: { abilityId: ability.id } } );
		return abilityScore.modifier;
	}
}
