import AbilityScoreModifier from "./AbilityScoreModifier.valueobject";

describe( "The AbilityScoreModifier", () => {
	describe( "fromAbilityScore", () => {
		it.each(
			[
				{ score: 1, expected: -5 },
				{ score: 9, expected: -1 },
				{ score: 10, expected: 0 },
				{ score: 11, expected: 0 },
				{ score: 14, expected: 2 },
				{ score: 15, expected: 2 },
				{ score: 16, expected: 3 },
				{ score: 30, expected: 10 },
			],
		)( "maps an ability score to a modifier", ( { score, expected } ) => {
			expect( AbilityScoreModifier.fromAbilityScore( score ).value ).toBe( expected );
		} );
	} );
} );
