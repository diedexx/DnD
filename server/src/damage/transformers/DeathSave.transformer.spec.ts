import DeathSave from "../models/DeathSave.valueobject";
import DeathSaveTransformer from "./DeathSave.transformer";

describe( "The DeathSaveTransformer class", () => {
	const healthTransformer = new DeathSaveTransformer();

	const map = [
		[ "0|0", new DeathSave( 0, 0 ) ],
		[ "2|3", new DeathSave( 2, 3 ) ],
	];

	describe( "from function", () => {
		it.each( map )( "transforms database values into DeathSave objects: %p", ( storedValue: string, healthObject: DeathSave ) => {
			expect( healthTransformer.from( storedValue ) ).toStrictEqual( healthObject );
		} );
	} );

	describe( "to function", () => {
		it.each( map )( "transforms DeathSave objects into database values: %p", ( storedValue: string, healthObject: DeathSave ) => {
			expect( healthTransformer.to( healthObject ) ).toBe( storedValue );
		} );
	} );
} );
