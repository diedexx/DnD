export default class InvalidSpellPool extends Error {
	/**
	 * Creates an InvalidSpellPool exception for the case where there are multiple spellslots of the same level in one pool.
	 *
	 * @return {InvalidSpellPool} The exception.
	 */
	public static becauseThereAreMoreOfTheSameLevelSpells(): InvalidSpellPool {
		return new InvalidSpellPool( "Cannot have more than one SpellSlot the same level" );
	}
}
