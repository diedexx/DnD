import Dice from "./Dice.valueobject";
import { Sides } from "./Die.valueobject";

describe( "The Dice class", () => {
	describe( "constructor", () => {
		it( "doesn't accept a numberOfDice below 1", () => {
			expect( () => new Dice( 0, 4 ) )
				.toThrow( "The number of dice cannot be less than 1" );

			expect( () => new Dice( -10, 20 ) )
				.toThrow( "The number of dice cannot be less than 1" );
		} );
	} );

	describe( "toString", () => {
		it.each( [
			[ 6, 20, "6d20" ],
			[ 1, 8, "1d8" ],
			[ 200, 6, "200d6" ],
		] )( "outputs a human readable description of the dice", ( numberOfDice, sides, expected ) => {
			const dice = new Dice( numberOfDice, sides as Sides );
			expect( "" + dice ).toEqual( expected );
			expect( dice.toString() ).toEqual( expected );
		} );
	} );
} );
