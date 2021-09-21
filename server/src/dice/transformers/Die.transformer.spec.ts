import Die, { Sides } from "../models/Die";
import DieTransformer from "./Die.transformer";

describe( "The DieTransformer class", () => {
	const instance = new DieTransformer();
	describe( "from function", () => {
		it.each( [ 20, 8, 4 ] )( "transforms database values into Die objects", ( sides: Sides ) => {
			expect( instance.from( sides ) ).toStrictEqual( new Die( sides ) );
		} );
	} );

	describe( "to function", () => {
		it.each( [ 20, 8, 4 ] )( "transforms Die objects into database values", ( sides: Sides ) => {
			expect( instance.to( new Die( sides ) ) ).toBe( sides );
		} );
	} );
} );
