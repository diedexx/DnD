export default class CannotUseSpellSlot extends Error {
	/**
	 * Creates an CannotUseSpellSlot exception for the case where there are no available spellslots for the requested level.
	 *
	 * @param {number} level The level that there are no spellslot for.
	 *
	 * @return {CannotUseSpellSlot} The exception.
	 */
	public static becauseThereAreNoSpellSlotsWithLevel( level: number ): CannotUseSpellSlot {
		return new CannotUseSpellSlot( "No spellslots available for level " + level );
	}

	/**
	 * Creates an CannotUseSpellSlot exception for the case where all spellslots for the requested level have been consumed.
	 *
	 * @param {number} level The level that there are no remaining spellslots for.
	 *
	 * @return {CannotUseSpellSlot} The exception.
	 */
	public static becauseNoSpellsRemainingForLevel( level: number ): CannotUseSpellSlot {
		return new CannotUseSpellSlot( "Used up all spellslots for level " + level );
	}
}
