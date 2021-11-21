import Dice from "../values/Dice.value";
import DiceTransformer from "./Dice.transformer";

describe( "The DiceTransformer class", () => {
	const instance = new DiceTransformer();
	describe( "from function", () => {
		it( "transforms database values into Dice objects", () => {
			expect( instance.from( "2d8" ) ).toStrictEqual( new Dice( 2, 8 ) );
		} );
	} );

	describe( "to function", () => {
		it( "transforms Dice objects into database values", () => {
			expect( instance.to( new Dice( 2, 8 ) ) ).toBe( "2d8" );
		} );
	} );
} );
