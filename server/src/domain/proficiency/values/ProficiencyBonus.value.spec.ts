import ProficiencyBonus from "./ProficiencyBonus.value";

describe( "The ProficiencyBonus object", () => {
	describe( "the constructor", () => {
		it.each( [ 2, 3, 4, 5, 6 ] )( "accepts values between 2 and 6", ( bonus: number ) => {
			expect( () => new ProficiencyBonus( bonus ) ).not.toThrow();
		} );
		it.each( [ -10, -0, 0, 1, 7, 8000 ] )( "doesn't accepts values lower than 2 and higher than 6 ", ( bonus: number ) => {
			expect( () => new ProficiencyBonus( bonus ) ).toThrow( "Proficiency bonus should be between 2 and 6. " + bonus + " given" );
		} );
	} );
	describe( "fromLevel", () => {
		it.each( [
			{ level: 1, expected: 2 },
			{ level: 2, expected: 2 },
			{ level: 3, expected: 2 },
			{ level: 4, expected: 2 },
			{ level: 5, expected: 3 },
			{ level: 6, expected: 3 },
			{ level: 7, expected: 3 },
			{ level: 8, expected: 3 },
			{ level: 9, expected: 4 },
			{ level: 10, expected: 4 },
			{ level: 11, expected: 4 },
			{ level: 12, expected: 4 },
			{ level: 13, expected: 5 },
			{ level: 14, expected: 5 },
			{ level: 15, expected: 5 },
			{ level: 16, expected: 5 },
			{ level: 17, expected: 6 },
			{ level: 18, expected: 6 },
			{ level: 19, expected: 6 },
			{ level: 20, expected: 6 },

		] )( "transforms the character level into a proficiency bonus value", ( { level, expected } ) => {
			expect( ProficiencyBonus.forLevel( level ).value ).toBe( expected );
		} );
	} );
} );
