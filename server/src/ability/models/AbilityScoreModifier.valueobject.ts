import { ObjectType } from "@nestjs/graphql";
import Modifier from "../../modifier/models/Modifier.valueobject";

@ObjectType()
export default class AbilityScoreModifier extends Modifier {
	/**
	 * Creates a new Modifier based on an a ability score.
	 *
	 * @param {number} score The Ability score to create the Modifier for.
	 *
	 * @return {AbilityScoreModifier} The AbilityScoreModifier.
	 */
	public static fromAbilityScore( score: number ): AbilityScoreModifier {
		return new AbilityScoreModifier( Math.floor( ( score - 10 ) / 2 ) );
	}
}

