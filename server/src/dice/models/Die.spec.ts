import Die, { Sides } from "./Die";

describe( "The Die class", () => {
	describe( "toString", () => {
		it.each( [
			[ 20, "d20" ],
			[ 8, "d8" ],
			[ 6, "d6" ],
		] )( "outputs a human readable description of the die", ( sides, expected ) => {
			const die = new Die( sides as Sides );
			expect( "" + die ).toEqual( expected );
			expect( die.toString() ).toEqual( expected );
		} );
	} );
} );
