import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../../infrastructure/Base.resolver";
import RelationLoaderService from "../../infrastructure/database/RelationLoader.service";
import Modifier from "../modifier/values/Modifier.value";
import Skill from "./entities/Skill.entity";
import SkillScore from "./entities/SkillScore.entity";
import SkillScoreService from "./SkillScore.service";

@Resolver( SkillScore )
export default class SkillScoreResolver extends BaseResolver( SkillScore, "skillScore", "skillScores" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<SkillScore>} skillScoreRepository The SkillScore repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 * @param {SkillScoreService} skillScoreService A service that manages SkillScores.
	 */
	constructor(
		@InjectRepository( SkillScore )
		private readonly skillScoreRepository: Repository<SkillScore>,
		private readonly relationLoaderService: RelationLoaderService,
		private readonly skillScoreService: SkillScoreService,
	) {
		super( skillScoreRepository );
	}

	/**
	 * Get the skillScore modifier.
	 *
	 * @param {SkillScore} skillScore The skillScore to get the modifier for.
	 *
	 * @return {Promise<SkillScore>} The modifier for the skillScore.
	 */
	@ResolveField( "modifier", () => Modifier )
	public async getModifier( @Parent() skillScore: SkillScore ): Promise<Modifier> {
		return this.skillScoreService.getSkillScoreModifier( skillScore );
	}

	/**
	 * Get the skill that this skillScore benefits.
	 *
	 * @param {SkillScore} skillScore The skillScore to get the skill for.
	 *
	 * @return {Promise<Skill>} The skill that this skillScore benefits.
	 */
	@ResolveField( "skill", () => Skill )
	public async getSkill( @Parent() skillScore: SkillScore ): Promise<Skill> {
		return ( await this.relationLoaderService.loadRelations( skillScore, [ "skill" ] ) ).skill;
	}
}
