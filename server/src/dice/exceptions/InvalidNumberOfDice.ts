export default class InvalidNumberOfDice extends Error {
	/**
	 * Get an invalidNumberOfDice exception for a dice size smaller than 1.
	 *
	 * @return {InvalidNumberOfDice} The exception.
	 */
	public static lessThanOnceDie(): InvalidNumberOfDice {
		return new InvalidNumberOfDice( "The number of dice cannot be less than 1" );
	}
}
