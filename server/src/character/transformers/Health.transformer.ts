import { ValueTransformer } from "typeorm";
import Health from "../models/Health.valueobject";

export default class HealthTransformer implements ValueTransformer {
	/**
	 * Transform a database value into a Health object.
	 *
	 * @param {string} value The value to transform.
	 *
	 * @return {Health} The Health object.
	 */
	public from( value: string ): Health {
		const [ current, max ] = value.split( "/" );
		return new Health( parseInt( max, 10 ), parseInt( current, 10 ) );
	}

	/**
	 * Transform a Health object value into a database value.
	 *
	 * @param {Health} health The Health object.
	 *
	 * @return {string} The database value.
	 */
	public to( health: Health ): string {
		return `${health.currentHealth}/${health.maxHealth}`;
	}
}
