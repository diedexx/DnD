import { ValueTransformer } from "typeorm";
import AbilityScoreValue from "../values/AbilityScore.value";

export default class AbilityScoreValueTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a AbilityScoreValue object.
	 *
	 * @param {number} value The value to transform.
	 *
	 * @return {AbilityScoreValue} The AbilityScoreValue object.
	 */
	public from( value: number ): AbilityScoreValue {
		return new AbilityScoreValue( value );
	}

	/**
	 * Transform a AbilityScoreValue object value into a database value.
	 *
	 * @param {AbilityScoreValue} abilityScoreValue The AbilityScoreValue object.
	 *
	 * @return {number} The database value.
	 */
	public to( abilityScoreValue: AbilityScoreValue ): number {
		return abilityScoreValue.value;
	}
}
