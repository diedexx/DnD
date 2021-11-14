import AbilityScoreValue from "../values/AbilityScore.value";
import AbilityScoreValueTransformer from "./AbilityScoreValue.transformer";

describe( "The AbilityScoreValueTransformer class", () => {
	const abilityScoreValueTransformer = new AbilityScoreValueTransformer();

	describe( "from function", () => {
		it.each( [ 1, 4, 7 ] )( "transforms database values into AbilityScoreValue objects", ( value ) => {
			expect( abilityScoreValueTransformer.from( value ) ).toStrictEqual( new AbilityScoreValue( value ) );
		} );
	} );

	describe( "to function", () => {
		it.each( [ 1, 4, 7 ] )( "transforms AbilityScoreValue objects into database values", ( value ) => {
			expect( abilityScoreValueTransformer.to( new AbilityScoreValue( value ) ) ).toBe( value );
		} );
	} );
} );
