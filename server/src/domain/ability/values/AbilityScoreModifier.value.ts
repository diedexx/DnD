import { ObjectType } from "@nestjs/graphql";
import Modifier from "../../modifier/values/Modifier.value";

@ObjectType()
export default class AbilityScoreModifier extends Modifier {
	/**
	 * Creates a new Modifier based on an ability score.
	 *
	 * @param {number} score The Ability score to create the Modifier for.
	 *
	 * @return {AbilityScoreModifier} The AbilityScoreModifier.
	 */
	public static fromAbilityScore( score: number ): AbilityScoreModifier {
		return new AbilityScoreModifier( Math.floor( ( score - 10 ) / 2 ) );
	}
}

