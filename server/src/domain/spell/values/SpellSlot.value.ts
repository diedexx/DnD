import { Field, ObjectType } from "@nestjs/graphql";
import CannotUseSpellSlot from "../exceptions/CannotUseSpellSlot.exception";
import SpellLevel from "./SpellLevel.value";

@ObjectType()
export default class SpellSlot {
	@Field()
	public readonly level: SpellLevel;

	@Field()
	public readonly limit: number;

	@Field()
	public readonly remaining: number;

	/**
	 * The constructor.
	 *
	 * @param {SpellLevel} level The level of the spell slot.
	 * @param {number} limit How many spell slots of this level the character can have.
	 * @param {number} remaining How many spell slots the character has remaining.
	 */
	public constructor( level: SpellLevel, limit = 0, remaining = 0 ) {
		this.level = level;
		this.limit = Math.max( limit, 0 );
		this.remaining = Math.max( Math.min( remaining, this.limit ), 0 );
	}

	/**
	 * Consume a spell slot.
	 *
	 * @return {SpellSlot} The new spell slot.
	 */
	public use(): SpellSlot {
		if ( this.remaining < 1 ) {
			throw CannotUseSpellSlot.becauseNoSpellsRemainingForLevel( this.level.value );
		}
		return new SpellSlot( this.level, this.limit, this.remaining - 1 );
	}
}
