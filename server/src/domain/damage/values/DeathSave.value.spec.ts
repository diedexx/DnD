import InvalidDeathSave from "../exceptions/InvalidDeathSave.exception";
import DeathSave from "./DeathSave.value";

describe( "The DeathSave class", () => {
	describe( "constructor", () => {
		it( "should transform a number of successes and failures into an object", () => {
			const actual = new DeathSave( 1, 2 );
			expect( actual.successes ).toBe( 1 );
			expect( actual.failures ).toBe( 2 );
		} );
		it( "should have a failure count higher than or equal to 0", () => {
			expect( () => {
				new DeathSave( 1, -1 );
			} ).toThrow( InvalidDeathSave );
			expect( () => {
				new DeathSave( 1, 0 );
			} ).not.toThrow( InvalidDeathSave );
		} );
		it( "should have a failure count lower than or equal to 3", async () => {
			expect( () => {
				new DeathSave( 1, 4 );
			} ).toThrow( InvalidDeathSave );
			expect( () => {
				new DeathSave( 1, 3 );
			} ).not.toThrow( InvalidDeathSave );
		} );

		it( "should have a successes count higher than or equal to 0", () => {
			expect( () => {
				new DeathSave( -1, 1 );
			} ).toThrow( InvalidDeathSave );
			expect( () => {
				new DeathSave( 0, 1 );
			} ).not.toThrow( InvalidDeathSave );
		} );
		it( "should have a successes count lower than or equal to 3", async () => {
			expect( () => {
				new DeathSave( 4, 1 );
			} ).toThrow( InvalidDeathSave );
			expect( () => {
				new DeathSave( 3, 1 );
			} ).not.toThrow( InvalidDeathSave );
		} );
	} );
} );
