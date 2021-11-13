import { Injectable } from "@nestjs/common";
import RelationLoaderService from "../../../database/RelationLoader.service";
import AbilityScore from "../../ability/entities/AbilityScore.entity";
import AbilityScoreValue from "../../ability/values/AbilityScore.value";
import Character from "../../character/entities/Character.entity";
import AbilityPlusLevelLimiterRules, { Rule } from "./AbilityPlusLevelLimiterRules.service";
import PreparationLimiterInterface from "./PreparationLimiter.interface";

@Injectable()
export default class AbilityPlusLevelLimiter implements PreparationLimiterInterface {
	/**
	 * The constructor.
	 *
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 * @param {AbilityPlusLevelLimiterRules} rulesProvider A service which provides the ruleset for this limiter.
	 */
	public constructor(
		private readonly relationLoaderService: RelationLoaderService,
		private readonly rulesProvider: AbilityPlusLevelLimiterRules,
	) {
	}

	/**
	 * @inheritDoc
	 */
	public async getPreparationLimit( character: Character ): Promise<number> {
		const characterRule = await this.getRule( character );

		const { abilityScores } = await this.relationLoaderService.loadRelations( character, [ "abilityScores.ability" ] );

		let foundAbilityScore = abilityScores.find(
			( abilityScore: AbilityScore ) => abilityScore.ability.name.toLowerCase() === characterRule.abilityName.toLowerCase(),
		);
		if ( ! foundAbilityScore ) {
			foundAbilityScore = new AbilityScore();
			foundAbilityScore.score = new AbilityScoreValue( 1 );
		}

		return Math.max( Math.floor( foundAbilityScore.modifier.value + ( character.level * characterRule.levelMultiplier ) ), 1 );
	}

	/**
	 * @inheritDoc
	 */
	public async supports( character: Character ): Promise<boolean> {
		try {
			await this.getRule( character );
		} catch ( e ) {
			return false;
		}
		return true;
	}

	/**
	 * Gets a single rule for a character.
	 *
	 * @param {Character} character The character to get the rule for.
	 *
	 * @return {Promise<Rule>} The rule.
	 *
	 * @private
	 */
	private async getRule( character: Character ): Promise<Rule> {
		const { "class": characterClass } = await this.relationLoaderService.loadRelations( character, [ "class" ] );
		return this.rulesProvider.getRule( characterClass.name );
	}
}

