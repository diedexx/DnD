export default class InvalidDie extends Error {
	/**
	 * Gets an exception for an invalid number of die sides.
	 *
	 * @param {number} sides The number of sides that is invalid.
	 *
	 * @return {InvalidDie} The exception.
	 */
	public static becauseOfInvalidNumberOfSides( sides: number ): InvalidDie {
		return new InvalidDie( "Invalid number of sides. There is no die with " + sides + " sides." );
	}
}
