import Health from "../models/Health.valueobject";
import HealthTransformer from "./Health.transformer";

describe( "The HealthTransformer class", () => {
	const healthTransformer = new HealthTransformer();

	const map = [
		[ "6/10", new Health( 10, 6 ) ],
		[ "23/23", new Health( 23, 23 ) ],
	];

	describe( "from function", () => {
		it.each( map )( "transforms database values into Health objects: %p", ( storedValue: string, healthObject: Health ) => {
			expect( healthTransformer.from( storedValue ) ).toStrictEqual( healthObject );
		} );
	} );

	describe( "to function", () => {
		it.each( map )( "transforms Health objects into database values: %p", ( storedValue: string, healthObject: Health ) => {
			expect( healthTransformer.to( healthObject ) ).toBe( storedValue );
		} );
	} );
} );
