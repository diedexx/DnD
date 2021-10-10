import SpellLevel from "./SpellLevel.valueobject";

describe( "The SpellLevel class", () => {
	describe( "constructor", () => {
		it.each( [ -0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] )( "allows values between 0 and 9", ( level ) => {
			expect( () => new SpellLevel( level ) ).not.toThrow();
		} );

		it.each( [ -100, -10, -1 ] )( "rejects values lower than 0", ( level ) => {
			expect( () => new SpellLevel( level ) ).toThrow( "Spell level cannot be lower than 0. " + level + " given" );
		} );

		it.each( [ 10, 50, 100 ] )( "rejects values exceeding 9", ( level ) => {
			expect( () => new SpellLevel( level ) ).toThrow( "Spell level cannot exceed 9. " + level + " given" );
		} );
	} );
} );
