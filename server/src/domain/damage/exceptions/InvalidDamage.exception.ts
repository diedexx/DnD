export class InvalidDamage extends Error {
	/**
	 * Gets an InvalidDamage exception for an invalid damage type.
	 *
	 * @param {string} damageType The invalid damage type.
	 *
	 * @return {InvalidDamage} The exception.
	 */
	public static becauseInvalidDamageType( damageType: string ): InvalidDamage {
		return new InvalidDamage( "Invalid damage type: " + damageType );
	}
}
