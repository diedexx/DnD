import AbilityScoreModifier from "../../ability/models/AbilityScoreModifier.valueobject";
import AbilityScoreModifierTransformer from "./AbilityScoreModifier.transformer";

describe( "The AbilityScoreModifierTransformer class", () => {
	const abilityScoreModifierTransformer = new AbilityScoreModifierTransformer();

	describe( "from function", () => {
		it.each( [ -12, -0, 0, 15 ] )( "transforms database values into AbilityScoreModifier objects", ( modifier ) => {
			expect( abilityScoreModifierTransformer.from( modifier ) ).toStrictEqual( new AbilityScoreModifier( modifier ) );
		} );
	} );

	describe( "to function", () => {
		it.each( [ -12, -0, 0, 15 ] )( "transforms AbilityScoreModifier objects into database values", ( modifier ) => {
			expect( abilityScoreModifierTransformer.to( new AbilityScoreModifier( modifier ) ) ).toBe( modifier );
		} );
	} );
} );
