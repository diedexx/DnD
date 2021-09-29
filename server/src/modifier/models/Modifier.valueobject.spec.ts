import Modifier from "./Modifier.valueobject";

describe( "The Modifier", () => {
	describe( "value getter", () => {
		it.each( [ 1, 6, 9, 0, -1, -20 ] )( "returns the given value", ( modifier: number ) => {
			const instance = new Modifier( modifier );
			expect( instance.value ).toEqual( modifier );
		} );
	} );

	describe( "toString function", () => {
		it.each(
			[
				[ 1, "+1" ],
				[ 65, "+65" ],
				[ 0, "+0" ],
				[ -0, "+0" ],
				[ -1, "-1" ],
				[ -62, "-62" ],
			],
		)( "displays the Modifier in a human readable way", ( modifier: number, expected: string ) => {
			const instance = new Modifier( modifier );
			expect( instance.toString() ).toEqual( expected );
		} );
	} );
} );
