export default class InvalidAbilityScoreValue extends Error {
	/**
	 * Gets an exception for the case where the given value is too high.
	 *
	 * @param {number} value The given value.
	 *
	 * @return {InvalidAbilityScoreValue} The exception.
	 */
	public static becauseValueTooHigh( value: number ): InvalidAbilityScoreValue {
		return new InvalidAbilityScoreValue( "AbilityScore value cannot exceed 30. " + value + " given" );
	}

	/**
	 * Gets an exception for the case where the given value is too low.
	 *
	 * @param {number} value The given value.
	 *
	 * @return {InvalidAbilityScoreValue} The exception.
	 */
	public static becauseValueTooLow( value: number ): InvalidAbilityScoreValue {
		return new InvalidAbilityScoreValue( "AbilityScore value cannot be lower than 1. " + value + " given" );
	}
}
