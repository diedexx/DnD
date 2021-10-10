import Modifier from "../models/Modifier.valueobject";
import ModifierTransformer from "./Modifier.transformer";

describe( "The ModifierTransformer class", () => {
	const modifierTransformer = new ModifierTransformer();

	describe( "from function", () => {
		it.each( [ -12, -0, 0, 15 ] )( "transforms database values into Modifier objects", ( modifier ) => {
			expect( modifierTransformer.from( modifier ) ).toStrictEqual( new Modifier( modifier ) );
		} );
	} );

	describe( "to function", () => {
		it.each( [ -12, -0, 0, 15 ] )( "transforms Modifier objects into database values", ( modifier ) => {
			expect( modifierTransformer.to( new Modifier( modifier ) ) ).toBe( modifier );
		} );
	} );
} );
