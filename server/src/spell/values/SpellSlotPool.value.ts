import { Field, ObjectType } from "@nestjs/graphql";
import CannotUseSpellSlot from "../exceptions/CannotUseSpellSlot.exception";
import InvalidSpellPool from "../exceptions/InvalidSpellPool.exception";
import SpellLevel from "./SpellLevel.value";
import SpellSlot from "./SpellSlot.value";

@ObjectType()
export default class SpellSlotPool {
	@Field( () => [ SpellSlot ] )
	public readonly spellSlots: ReadonlyArray<SpellSlot>;

	/**
	 * The constructor.
	 *
	 * @param{SpellLevel[]} spellSlots The spell slots in the pool.
	 *
	 * @throws InvalidSpellPool when there are more spell slots of the same level.
	 */
	public constructor( spellSlots: SpellSlot[] = [] ) {
		this.spellSlots = spellSlots;

		const levels = this.spellSlots.map( ( spellSlot: SpellSlot ) => spellSlot.level.value );
		if ( this.hasDuplicate( levels ) ) {
			throw InvalidSpellPool.becauseThereAreMoreOfTheSameLevelSpells();
		}
	}

	/**
	 * Gets a spell slot by level from the pool/
	 *
	 * @param {SpellLevel} level The level of the spell slot to get.
	 *
	 * @throws CannotUseSpellSlot When there is no spell slot known for the requested level.
	 *
	 * @return {SpellSlot} The found spell slot.
	 */
	public getSpellSlot( level: SpellLevel ) {
		const spellSlot = this.spellSlots.find( ( slot: SpellSlot ) => slot.level.equals( level ) );
		if ( ! spellSlot ) {
			throw CannotUseSpellSlot.becauseThereAreNoSpellSlotsWithLevel( level.value );
		}
		return spellSlot;
	}

	/**
	 * Uses a spell slot.
	 *
	 * @param {SpellLevel} level The level of the spell slot to use.
	 *
	 * @throws CannotUseSpellSlot When there is no spell slot known for the requested level.
	 * @throws CannotUseSpellSlot When there are no remaining spells for this spell level.
	 *
	 * @return {SpellSlotPool} The new spell slot pool.
	 */
	public useSpellSlot( level: SpellLevel ): SpellSlotPool {
		const targetSpellSlot = this.getSpellSlot( level );
		return new SpellSlotPool( this.spellSlots.map( ( spellSlot: SpellSlot ) => {
			if ( spellSlot !== targetSpellSlot ) {
				return spellSlot;
			}
			return spellSlot.use();
		} ) );
	}

	/**
	 * Checks if an array has any duplicate values.
	 *
	 * @param {any[]} array The array to check.
	 *
	 * @return {boolean} True if the array has any duplicate values.
	 *
	 * @private
	 */
	private hasDuplicate( array: any[] ): boolean {
		return new Set( array ).size !== array.length;
	}
}
