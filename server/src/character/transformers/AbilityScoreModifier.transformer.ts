import { ValueTransformer } from "typeorm";
import AbilityScoreModifier from "../../ability/models/AbilityScoreModifier.valueobject";

export default class AbilityScoreModifierTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a AbilityScoreModifier object.
	 *
	 * @param {number} modifier The value to transform.
	 *
	 * @return {AbilityScoreModifier} The AbilityScoreModifier object.
	 */
	public from( modifier: number ): AbilityScoreModifier {
		return new AbilityScoreModifier( modifier );
	}

	/**
	 * Transform a AbilityScoreModifier object value into a database value.
	 *
	 * @param {AbilityScoreModifier} abilityScoreModifier The AbilityScoreModifier object.
	 *
	 * @return {number} The database value.
	 */
	public to( abilityScoreModifier: AbilityScoreModifier ): number {
		return abilityScoreModifier.value;
	}
}
