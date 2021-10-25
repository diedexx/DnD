import CannotUseSpellSlot from "../exceptions/CannotUseSpellSlot.exception";
import SpellLevel from "./SpellLevel.value";
import SpellSlot from "./SpellSlot.value";
import SpellSlotPool from "./SpellSlotPool.value";

describe( "The SpellSlotPool valueobject", () => {
	const firstLevelSpell = new SpellSlot( new SpellLevel( 1 ), 10, 3 );
	const thirdLevelSpell = new SpellSlot( new SpellLevel( 3 ), 6, 5 );
	const sixthLevelSpell = new SpellSlot( new SpellLevel( 6 ), 2, 1 );

	describe( "constructor", () => {
		it( "can't receive spellslots of the same level", () => {
			expect( ()=>new SpellSlotPool( [ firstLevelSpell, firstLevelSpell ] ) ).toThrow();
		} );
	} );

	describe( "getSpellSlot", () => {
		it( "can't always find a spellslot", () => {
			const instance = new SpellSlotPool();
			expect( () => instance.getSpellSlot( new SpellLevel( 2 ) ) ).toThrow( CannotUseSpellSlot );
		} );
		it( "finds a spellslot for a spell level", () => {
			const instance = new SpellSlotPool( [ firstLevelSpell, sixthLevelSpell, thirdLevelSpell ] );
			expect( instance.getSpellSlot( new SpellLevel( 3 ) ) ).toEqual( thirdLevelSpell );
		} );
	} );
} );
