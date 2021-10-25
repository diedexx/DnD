export default class InvalidSpellLevel extends Error {
	/**
	 * Gets an exception for the case where the given level is too high.
	 *
	 * @param {number} level The given level.
	 *
	 * @return {InvalidSpellLevel} The exception.
	 */
	public static becauseLevelTooHigh( level: number ): InvalidSpellLevel {
		return new InvalidSpellLevel( "Spell level cannot exceed 9. " + level + " given" );
	}

	/**
	 * Gets an exception for the case where the given level is too low.
	 *
	 * @param {number} level The given level.
	 *
	 * @return {InvalidSpellLevel} The exception.
	 */
	public static becauseLevelTooLow( level: number ): InvalidSpellLevel {
		return new InvalidSpellLevel( "Spell level cannot be lower than 0. " + level + " given" );
	}
}
