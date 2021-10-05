export default class InvalidDamageString extends Error {
	/**
	 * Gets an InvalidDamageString exception for an wrongly formatted input string.
	 *
	 * @param {string} inputString The wrongly formatted input string.
	 *
	 * @return {InvalidDamageString} The exception.
	 */
	public static becauseOfUnexpectedFormat( inputString: string ): InvalidDamageString {
		return new InvalidDamageString( "Invalid damage string format. Could not parse " + inputString );
	}
}
