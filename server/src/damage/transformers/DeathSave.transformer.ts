import { ValueTransformer } from "typeorm";
import DeathSave from "../models/DeathSave.valueobject";

export default class DeathSaveTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a DeathSave object.
	 *
	 * @param {string} value The value to transform.
	 *
	 * @return {DeathSave} The DeathSave object.
	 */
	public from( value: string ): DeathSave {
		const [ successes, failures ] = value.split( "|" );
		return new DeathSave( parseInt( successes, 10 ), parseInt( failures, 10 ) );
	}

	/**
	 * Transform a DeathSave object value into a database value.
	 *
	 * @param {DeathSave} deathSave The DeathSave object.
	 *
	 * @return {string} The database value.
	 */
	public to( deathSave: DeathSave ): string {
		return `${deathSave.successes}|${deathSave.failures}`;
	}
}
