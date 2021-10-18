import InvalidSpellLevel from "../exceptions/InvalidSpellLevel.exception";

export default class SpellLevel {
	public readonly level: number;

	/**
	 * The constructor.
	 *
	 * @param {number} level The level.
	 *
	 * @throws InvalidSpellLevel If the given level is invalid.
	 */
	public constructor( level: number ) {
		this.level = level;
		this.assertValidLevel();
	}

	/**
	 * Checks if the level is in a valid state.
	 *
	 * @return {void}
	 *
	 * @private
	 */
	private assertValidLevel(): void {
		if ( this.level > 9 ) {
			throw InvalidSpellLevel.becauseLevelTooHigh( this.level );
		}
		if ( this.level < 0 ) {
			throw InvalidSpellLevel.becauseLevelTooLow( this.level );
		}
	}
}
