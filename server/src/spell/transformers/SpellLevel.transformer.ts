import { ValueTransformer } from "typeorm";
import SpellLevel from "../models/SpellLevel.valueobject";

export default class SpellLevelTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a SpellLevel object.
	 *
	 * @param {number} level The value to transform.
	 *
	 * @return {SpellLevel} The SpellLevel object.
	 */
	public from( level: number ): SpellLevel {
		return new SpellLevel( level );
	}

	/**
	 * Transform a SpellLevel object value into a database value.
	 *
	 * @param {SpellLevel} spellLevel The SpellLevel object.
	 *
	 * @return {number} The database value.
	 */
	public to( spellLevel: SpellLevel ): number {
		return spellLevel.level;
	}
}
