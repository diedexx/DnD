import Dice from "./Dice.value";
import { Sides } from "./Die.value";

describe( "The Dice class", () => {
	describe( "constructor", () => {
		it( "doesn't accept a numberOfDice below 1", () => {
			expect( () => new Dice( 0, 4 ) )
				.toThrow( "The number of dice cannot be less than 1" );

			expect( () => new Dice( -10, 20 ) )
				.toThrow( "The number of dice cannot be less than 1" );
		} );
	} );

	describe( "toString function", () => {
		it.each( [
			[ 6, 20, "6d20" ],
			[ 1, 8, "1d8" ],
			[ 200, 6, "200d6" ],
		] )( "returns a human readable description of the dice", ( numberOfDice, sides, expected ) => {
			const dice = new Dice( numberOfDice, sides as Sides );
			expect( "" + dice ).toEqual( expected );
			expect( dice.toString() ).toEqual( expected );
		} );
	} );

	describe( "from function", () => {
		it( "creates a new Dice object from a string", () => {
			const dice = Dice.from( "3d8" );
			expect( dice.toString() ).toBe( "3d8" );
		} );

		it( "doesn't accept non-existent dice sides", () => {
			expect( () => Dice.from( "3d300" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Invalid number of sides. There is no die with 300 sides.\"" );
		} );

		it( "doesn't accept invalid number of dice", () => {
			expect( () => Dice.from( "0d2" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"The number of dice cannot be less than 1\"" );
		} );

		it( "doesn't accept incorrectly formatted strings", () => {
			expect( () => Dice.from( "3xd80" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Incorrectly formatted Dice string. \\\"3xd80\\\". Example format: 2d8\"" );

			expect( () => Dice.from( "" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Incorrectly formatted Dice string. \\\"\\\". Example format: 2d8\"" );
		} );
	} );
} );
