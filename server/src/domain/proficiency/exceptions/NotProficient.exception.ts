export default class NotProficient extends Error {
	/**
	 * Gets the exception for when a character is not proficient with a type weapon.
	 *
	 * @param {string} name The name of the weapon.
	 *
	 * @return {NotProficient} The exception.
	 */
	public static withWeapon( name: string ): NotProficient {
		return new NotProficient( "The character is not proficient with \"" + name + "\"" );
	}
}
