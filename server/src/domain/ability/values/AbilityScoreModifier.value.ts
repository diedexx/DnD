import { ObjectType } from "@nestjs/graphql";
import Modifier from "../../modifier/values/Modifier.value";
import AbilityScoreValue from "./AbilityScore.value";

@ObjectType()
export default class AbilityScoreModifier extends Modifier {
	/**
	 * Creates a new Modifier based on an ability score.
	 *
	 * @param {AbilityScoreValue} score The Ability score to create the Modifier for.
	 *
	 * @return {AbilityScoreModifier} The AbilityScoreModifier.
	 */
	public static fromAbilityScore( score: AbilityScoreValue ): AbilityScoreModifier {
		return new AbilityScoreModifier( Math.floor( ( score.value - 10 ) / 2 ) );
	}
}

