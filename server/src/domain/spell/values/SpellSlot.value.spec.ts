import CannotUseSpellSlot from "../exceptions/CannotUseSpellSlot.exception";
import SpellLevel from "./SpellLevel.value";
import SpellSlot from "./SpellSlot.value";

describe( "The SpellSlot value object", () => {
	describe( "constructor", () => {
		it( "can't have a limit under 0", () => {
			const instance = new SpellSlot( new SpellLevel( 2 ), -1, 1 );
			expect( instance.limit ).toBe( 0 );
		} );
		it( "can't have less than 0 remaining spells", () => {
			const instance = new SpellSlot( new SpellLevel( 2 ), 1, -1 );
			expect( instance.remaining ).toBe( 0 );
		} );
		it( "can't have more remaining spells than the limit", () => {
			const instance = new SpellSlot( new SpellLevel( 2 ), 1, 2 );
			expect( instance.remaining ).toBe( instance.limit );
			expect( instance.limit ).toBe( 1 );
		} );
	} );

	describe( "use function", () => {
		it( "reduces the remaining amount by one", () => {
			const instance = new SpellSlot( new SpellLevel( 1 ), 5, 3 );
			expect( instance.use().remaining ).toBe( 2 );
		} );
		it( "can't be used when there are no slots remaining", () => {
			const instance = new SpellSlot( new SpellLevel( 1 ), 5, 0 );
			expect( () => instance.use() ).toThrow( CannotUseSpellSlot );
		} );
	} );
} );

