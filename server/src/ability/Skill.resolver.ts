import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../Base.resolver";
import RelationLoaderService from "../database/RelationLoader.service";
import Ability from "./entities/Ability.entity";
import Skill from "./entities/Skill.entity";

@Resolver( () => Skill )
export default class SkillResolver extends BaseResolver( Skill, "skill", "skills" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<Skill>} skillRepository The Skill repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	constructor(
		@InjectRepository( Skill )
		private readonly skillRepository: Repository<Skill>,
		private readonly relationLoaderService: RelationLoaderService,
	) {
		super( skillRepository );
	}

	/**
	 * Get the ability that benefits a skill.
	 *
	 * @param {Skill} skill The skill to get the ability for.
	 *
	 * @return {Promise<Skill>} The ability that benefit this skill.
	 */
	@ResolveField( "ability", () => Ability )
	public async getSkills( @Parent() skill: Skill ): Promise<Ability> {
		return ( await this.relationLoaderService.loadRelations( skill, [ "ability" ] ) ).ability;
	}
}
