import { ValueTransformer } from "typeorm";
import Dice from "../values/Dice.value";

export default class DiceTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a Dice object.
	 *
	 * @param {Sides} value The value to transform.
	 *
	 * @return {Dice} The Dice object.
	 */
	public from( value: string ): Dice {
		return Dice.from( value );
	}

	/**
	 * Transform a Dice object value into a database value.
	 *
	 * @param {Dice} value The Dice object.
	 *
	 * @return {Sides} The database value.
	 */
	public to( value: Dice ): string {
		return value.toString();
	}
}
