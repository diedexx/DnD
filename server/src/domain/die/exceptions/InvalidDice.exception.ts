export default class InvalidDice extends Error {
	/**
	 * Get an invalidNumberOfDice exception for a dice size smaller than 1.
	 *
	 * @return {InvalidDice} The exception.
	 */
	public static becauseOfLessThanOnceDie(): InvalidDice {
		return new InvalidDice( "The number of dice cannot be less than 1" );
	}
}
