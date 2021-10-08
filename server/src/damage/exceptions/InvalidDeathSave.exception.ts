export default class InvalidDeathSave extends Error {
	/**
	 * Gets an exception for the case that the number of failures is negative.
	 *
	 * @param {number} value The given value.
	 *
	 * @return {InvalidDeathSave} The exception
	 */
	public static becauseFailuresCantBeNegative( value: number ): InvalidDeathSave {
		return new InvalidDeathSave( "The number of failures can't be negative." + value + " given." );
	}

	/**
	 * Gets an exception for the case that the number of successes is negative.
	 *
	 * @param {number} value The given value.
	 *
	 * @return {InvalidDeathSave} The exception
	 */
	public static becauseSuccessesCantBeNegative( value: number ): InvalidDeathSave {
		return new InvalidDeathSave( "The number of successes can't be negative." + value + " given." );
	}

	/**
	 * Gets an exception for the case that the number of successes is over the limit.
	 *
	 * @param {number} value The given value.
	 *
	 * @return {InvalidDeathSave} The exception
	 */
	public static becauseCanOnlySucceedThreeTimes( value: number ): InvalidDeathSave {
		return new InvalidDeathSave( "The number of successes can't exceed 3 times." + value + " given." );
	}

	/**
	 * Gets an exception for the case that the number of failures if over the limit.
	 *
	 * @param {number} value The given value.
	 *
	 * @return {InvalidDeathSave} The exception
	 */
	public static becauseCanOnlyFailThreeTimes( value: number ): InvalidDeathSave {
		return new InvalidDeathSave( "The number of failures can't exceed 3 times." + value + " given." );
	}
}
