import InvalidAbilityScoreValue from "../../spell/exceptions/InvalidAbilityScoreValue.exception";
import AbilityScoreValue from "./AbilityScore.value";

describe( "The AbilityScoreValue value", () => {
	describe( "constructor", () => {
		it.each( [ -10, -0, 0, 0.9 ] )( "should reject values below 1", ( value ) => {
			expect( () => {
				new AbilityScoreValue( value );
			} ).toThrow( InvalidAbilityScoreValue );
		} );

		it( "should reject values above 30", () => {
			expect( () => {
				new AbilityScoreValue( 31 );
			} ).toThrow( InvalidAbilityScoreValue );
		} );

		it.each( [ 1, 4, 29, 30 ] )( "should set the value property", ( value ) => {
			const abilityScoreValue = new AbilityScoreValue( value );
			expect( abilityScoreValue.value ).toBe( value );
		} );
	} );
} );
