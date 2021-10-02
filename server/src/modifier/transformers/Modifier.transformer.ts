import { ValueTransformer } from "typeorm";
import Modifier from "../models/Modifier.valueobject";

export default class ModifierTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a Modifier object.
	 *
	 * @param {number} base The value to transform.
	 *
	 * @return {AbilityScoreModifier} The Modifier object.
	 */
	public from( base: number ): Modifier {
		return new Modifier( base );
	}

	/**
	 * Transform a Modifier object value into a database value.
	 *
	 * @param {Modifier} abilityScoreModifier The Modifier object.
	 *
	 * @return {number} The database value.
	 */
	public to( abilityScoreModifier: Modifier ): number {
		return abilityScoreModifier.base;
	}
}
