import SpellLevel from "../models/SpellLevel.valueobject";
import SpellLevelTransformer from "./SpellLevel.transformer";

describe( "The SpellLevelTransformer class", () => {
	const spellLevelTransformer = new SpellLevelTransformer();

	describe( "from function", () => {
		it.each( [ 0, 4, 7 ] )( "transforms database values into SpellLevel objects", ( level ) => {
			expect( spellLevelTransformer.from( level ) ).toStrictEqual( new SpellLevel( level ) );
		} );
	} );

	describe( "to function", () => {
		it.each( [ 0, 4, 7 ] )( "transforms SpellLevel objects into database values", ( level ) => {
			expect( spellLevelTransformer.to( new SpellLevel( level ) ) ).toBe( level );
		} );
	} );
} );
