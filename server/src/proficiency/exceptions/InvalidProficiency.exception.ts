export default class InvalidProficiency extends Error {
	/**
	 * Gets the exception object for the case where a proficiency has a too low or too high base.
	 *
	 * @param {number} bonus The invalid bonus.
	 *
	 * @return {InvalidProficiency} The exception
	 */
	public static becauseOfInvalidBonusValue( bonus: number ): InvalidProficiency {
		return new InvalidProficiency( "Proficiency bonus should be between 2 and 6. " + bonus + " given" );
	}
}
