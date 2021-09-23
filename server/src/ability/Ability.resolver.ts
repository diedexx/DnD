import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../Base.resolver";
import RelationLoaderService from "../database/RelationLoader.service";
import Ability from "./entities/Ability.entity";
import Skill from "./entities/Skill.entity";

@Resolver( () => Ability )
export default class AbilityResolver extends BaseResolver( Ability, "ability", "abilities" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<Ability>} abilityRepository The Ability repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	constructor(
		@InjectRepository( Ability )
		private readonly abilityRepository: Repository<Ability>,
		private readonly relationLoaderService: RelationLoaderService,
	) {
		super( abilityRepository );
	}

	/**
	 * Get the skills that benefit from an ability.
	 *
	 * @param {Ability} ability The ability to get the skills for.
	 *
	 * @return {Promise<Skill>} The skills that benefit from the ability.
	 */
	@ResolveField( "skills", () => [ Skill ] )
	public async getSkills( @Parent() ability: Ability ): Promise<Skill[]> {
		return ( await this.relationLoaderService.loadRelations( ability, [ "skills" ] ) ).skills;
	}
}
