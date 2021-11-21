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
	describe( "displayHealth getter", () => {
		it( "should display health like [remaining]/[max]", () => {
			const health = new Health( 20, 19 );
			expect( health.displayHealth ).toBe( "19/20" );
		} );
	} );

	describe( "heal function", () => {
		it( "should add a number of health points", () => {
			const health = new Health( 20, 10 );
			const actual = health.heal( 5 );
			expect( actual.currentHealth ).toBe( 15 );
		} );

		it( "should return a new instance", () => {
			const health = new Health( 20, 10 );
			const actual = health.heal( 5 );
			expect( actual ).not.toBe( health );
		} );

		it( "should not exceed max health", () => {
			const health = new Health( 20, 10 );
			const actual = health.heal( 15 );
			expect( actual.currentHealth ).toBe( 20 );
		} );
	} );
	describe( "takeDamage function", () => {
		it( "should subtract a number of health points", () => {
			const health = new Health( 20, 10 );
			const actual = health.takeDamage( 5 );
			expect( actual.currentHealth ).toBe( 5 );
		} );

		it( "should return a new instance", () => {
			const health = new Health( 20, 10 );
			const actual = health.takeDamage( 5 );
			expect( actual ).not.toBe( health );
		} );

		it( "should not go below 0 health", () => {
			const health = new Health( 20, 10 );
			const actual = health.takeDamage( 15 );
			expect( actual.currentHealth ).toBe( 0 );
		} );
	} );
} );
