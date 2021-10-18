import { ValueTransformer } from "typeorm";
import { DamageRoll } from "../values/DamageRoll.value";

export default class DamageRollTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a DamageRoll object.
	 *
	 * @param {string} damageString The database value.
	 *
	 * @return {DamageRoll} The DamageRoll object.
	 */
	public from( damageString: string ): DamageRoll {
		return DamageRoll.from( damageString );
	}

	/**
	 * Transform a DamageRoll object value into a database value.
	 *
	 * @param {DamageRoll} damageRoll The DamageRoll object.
	 *
	 * @return {string} The database value.
	 */
	public to( damageRoll: DamageRoll ): string {
		return damageRoll.toString();
	}
}
