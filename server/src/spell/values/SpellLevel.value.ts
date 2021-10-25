import { Field, ObjectType } from "@nestjs/graphql";
import InvalidSpellLevel from "../exceptions/InvalidSpellLevel.exception";

@ObjectType()
export default class SpellLevel {
	@Field()
	public readonly value: number;

	/**
	 * The constructor.
	 *
	 * @param {number} level The level.
	 *
	 * @throws InvalidSpellLevel If the given level is invalid.
	 */
	public constructor( level: number ) {
		this.value = level;
		this.assertValidLevel();
	}

	/**
	 * Checks if two levels are the same.
	 *
	 * @param {SpellLevel} level The other level to compare to.
	 *
	 * @return {boolean} True if the levels are equal.
	 */
	public equals( level: SpellLevel ): boolean {
		return this.value === level.value;
	}

	/**
	 * Checks if the level is in a valid state.
	 *
	 * @return {void}
	 *
	 * @private
	 */
	private assertValidLevel(): void {
		if ( this.value > 9 ) {
			throw InvalidSpellLevel.becauseLevelTooHigh( this.value );
		}
		if ( this.value < 0 ) {
			throw InvalidSpellLevel.becauseLevelTooLow( this.value );
		}
	}
}
