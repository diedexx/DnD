import AbilityScoreModifier from "../../abilities/models/AbilityScoreModifier";
import AbilityScoreModifierTransformer from "./AbilityScoreModifier.transformer";

describe( "The AbilityScoreModifierTransformer class", () => {
	const instance = new AbilityScoreModifierTransformer();
	describe( "from function", () => {
		it.each( [ -12, -0, 0, 15 ] )( "transforms database values into AbilityScoreModifier objects", ( modifier ) => {
			expect( instance.from( modifier ) ).toStrictEqual( new AbilityScoreModifier( modifier ) );
		} );
	} );

	describe( "to function", () => {
		it.each( [ -12, -0, 0, 15 ] )( "transforms AbilityScoreModifier objects into database values", ( modifier ) => {
			expect( instance.to( new AbilityScoreModifier( modifier ) ) ).toBe( modifier );
		} );
	} );
} );
