import Health from "./Health.value";

describe( "The Health entity", () => {
	describe( "constructor", () => {
		it.each( [
			{
				maxHealth: 10,
				currentHealth: 10,
				expectedMaxHealth: 10,
				expectedCurrentHealth: 10,
			},
			{
				maxHealth: 10,
				currentHealth: 20,
				expectedMaxHealth: 10,
				expectedCurrentHealth: 10,
			},
			{
				maxHealth: -10,
				currentHealth: -10,
				expectedMaxHealth: 1,
				expectedCurrentHealth: 0,
			},
			{
				maxHealth: 0,
				currentHealth: 0,
				expectedMaxHealth: 1,
				expectedCurrentHealth: 0,
			},
			{
				maxHealth: 10,
				currentHealth: 0,
				expectedMaxHealth: 10,
				expectedCurrentHealth: 0,
			},
		] )( "ensures valid state, %p", ( { maxHealth, currentHealth, expectedCurrentHealth, expectedMaxHealth } ) => {
			const health = new Health( maxHealth, currentHealth );
			expect( health.currentHealth ).toBe( expectedCurrentHealth );
			expect( health.maxHealth ).toBe( expectedMaxHealth );
		} );

		it.each( [ 10, -100, 0, -0 ] )( "defaults to maxHealth if no current health is given", ( maxHealth: number ) => {
			const health = new Health( maxHealth );
			expect( health.currentHealth ).toBe( health.maxHealth );
		} );
	} );
} );
