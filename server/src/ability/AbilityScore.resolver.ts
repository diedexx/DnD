import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../Base.resolver";
import Character from "../character/entities/Character.entity";
import RelationLoaderService from "../database/RelationLoader.service";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";

@Resolver( () => AbilityScore )
export default class AbilityScoreResolver extends BaseResolver( AbilityScore, "abilityScore", "abilityScores" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<AbilityScore>} abilityScoreRepository The AbilityScore repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	constructor(
		@InjectRepository( AbilityScore )
		private readonly abilityScoreRepository: Repository<AbilityScore>,
		private readonly relationLoaderService: RelationLoaderService,
	) {
		super( abilityScoreRepository );
	}

	/**
	 * Gets the character to whom the ability score belongs.
	 *
	 * @param {AbilityScore} abilityScore The abilityScore to get the character for.
	 *
	 * @return {Promise<Skill>} The character to whom the ability score belongs.
	 */
	@ResolveField( "character", () => [ Character ] )
	public async getCharacter( @Parent() abilityScore: AbilityScore ): Promise<Character> {
		return ( await this.relationLoaderService.loadRelations( abilityScore, [ "character" ] ) ).character;
	}

	/**
	 * Gets the ability the ability score is for.
	 *
	 * @param {AbilityScore} abilityScore The abilityScore to get the ability for.
	 *
	 * @return {Promise<Skill>} The ability the ability score is for.
	 */
	@ResolveField( "ability", () => Ability )
	public async getAbility( @Parent() abilityScore: AbilityScore ): Promise<Ability> {
		return ( await this.relationLoaderService.loadRelations( abilityScore, [ "ability" ] ) ).ability;
	}
}
