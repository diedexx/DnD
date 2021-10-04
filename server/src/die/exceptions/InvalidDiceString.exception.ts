export default class InvalidDiceString extends Error {
	/**
	 * Throws an invalid input string exception.
	 *
	 * @param {string} diceString The invalid dice string.
	 * @param {string} exampleFormat An example of the expected format.
	 *
	 * @return InvalidDiceString The exception.
	 */
	public static becauseOfInvalidFormat( diceString: string, exampleFormat: string ): InvalidDiceString {
		throw new InvalidDiceString( "Incorrectly formatted Dice string. \"" + diceString + "\". Example format: " + exampleFormat );
	}
}
