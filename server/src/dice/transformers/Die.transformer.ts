import { ValueTransformer } from "typeorm";
import Die, { Sides } from "../models/Die";

export default class DieTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a Die object.
	 *
	 * @param {Sides} value The value to transform.
	 *
	 * @return {Die} The Die object.
	 */
	public from( value: Sides ): Die {
		return new Die( value );
	}

	/**
	 * Transform a Die object value into a database value.
	 *
	 * @param {Die} value The Die object.
	 *
	 * @return {Sides} The database value.
	 */
	public to( value: Die ): Sides {
		return value.sides;
	}
}
