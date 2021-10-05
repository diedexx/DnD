import ModificationTypesType from "../types/ModificationTypes.type";
import ExternalModifier from "./ExternalModifier.valueobject";
import Modifier from "./Modifier.valueobject";

describe( "The Modifier", () => {
	const externalModifierPlus1: ExternalModifier = new ExternalModifier(
		"testing",
		ModificationTypesType.SKILL,
		new Modifier( 1 ),
		false,
	);

	const externalModifierPlus2: ExternalModifier = new ExternalModifier(
		"more testing",
		ModificationTypesType.ARMOR_CLASS,
		new Modifier( 2 ),
		false,
	);

	const situationalModifierPlus4: ExternalModifier = new ExternalModifier(
		"situational",
		ModificationTypesType.ABILITY,
		new Modifier( 4 ),
		true,
		"situational",
	);

	const nestedModifierPlus2Plus1: ExternalModifier = new ExternalModifier(
		"with modifiers",
		ModificationTypesType.INITIATIVE,
		new Modifier( 2, [ externalModifierPlus1 ] ),
		false,
	);

	describe( "constructor", () => {
		it( "sorts external modifiers by value and by whether they are situational", () => {
			const instance = new Modifier( 10 ).withExternalModifier(
				situationalModifierPlus4,
				nestedModifierPlus2Plus1,
				externalModifierPlus1,
				externalModifierPlus2,
			);
			expect( instance.externalModifiers ).toEqual( [
				nestedModifierPlus2Plus1,
				externalModifierPlus2,
				externalModifierPlus1,
				situationalModifierPlus4,
			] );
		} );
	} );

	describe( "value getter", () => {
		it.each( [ 1, 6, 9, 0, -1, -20 ] )( "returns the given base value without external modifiers", ( base: number ) => {
			const instance = new Modifier( base );
			expect( instance.value ).toEqual( base );
		} );

		it.each( [
			{ base: 2, externalModifiers: [ externalModifierPlus1 ], expectedValue: 3 },
			{ base: -2, externalModifiers: [ externalModifierPlus1, externalModifierPlus2 ], expectedValue: 1 },
		] )( "includes the external modifiers", ( { base, externalModifiers, expectedValue } ) => {
			const instance = new Modifier( base )
				.withExternalModifier( ...externalModifiers );
			expect( instance.value ).toEqual( expectedValue );
		} );

		it( "doesn't include situational modifiers", () => {
			const instance = new Modifier( 2 )
				.withExternalModifier( externalModifierPlus1, situationalModifierPlus4 );
			expect( instance.value ).toEqual( 3 );
		} );

		it( "includes external modifiers recursively", () => {
			const instance = new Modifier( 5 ).withExternalModifier( nestedModifierPlus2Plus1 );
			expect( instance.value ).toEqual( 8 );
		} );
	} );

	describe( "situationalValue getter", () => {
		it.each( [ 1, 6, 9, 0, -1, -20 ] )( "returns the given base value without external modifiers", ( base: number ) => {
			const instance = new Modifier( base );
			expect( instance.situationalValue ).toEqual( base );
		} );

		it( "includes situational modifiers", () => {
			const instance = new Modifier( 2 )
				.withExternalModifier( externalModifierPlus1, situationalModifierPlus4 );
			expect( instance.situationalValue ).toEqual( 7 );
		} );
	} );

	describe( "displayValue getter and toString function", () => {
		it.each( [
			[ -5, [ externalModifierPlus1 ], "-4" ],
			[ 0, [], "+0" ],
			[ -0, [], "+0" ],
			[ 10, [ externalModifierPlus1, nestedModifierPlus2Plus1, situationalModifierPlus4 ], "+14" ],
		] )(
			"returns a display-friendly version of the value without situational modifiers",
			( base: number, externalModifiers: ExternalModifier[], expected: string ) => {
				const instance = new Modifier( base, externalModifiers );
				expect( instance.displayValue ).toBe( expected );
				expect( instance.toString() ).toEqual( expected );
			} );
	} );

	describe( "displaySituationalValue getter", () => {
		it.each( [
			[ -5, [ externalModifierPlus1 ], "-4" ],
			[ 0, [], "+0" ],
			[ 10, [ externalModifierPlus1, nestedModifierPlus2Plus1, situationalModifierPlus4 ], "+18" ],
		] )(
			"returns a display-friendly version of the value with situational modifiers",
			( base: number, externalModifiers: ExternalModifier[], expected: string ) => {
				const instance = new Modifier( base, externalModifiers );
				expect( instance.displaySituationalValue ).toBe( expected );
			} );
	} );

	describe( "displayBaseValue getter", () => {
		it.each(
			[
				[ 1, "+1" ],
				[ 65, "+65" ],
				[ 0, "+0" ],
				[ -0, "+0" ],
				[ -1, "-1" ],
				[ -62, "-62" ],
			] )( "returns a display-friendly version of the base", ( base: number, expected: string ) => {
			const instance = new Modifier( base );
			expect( instance.displayBaseValue ).toEqual( expected );
		} );
	} );

	describe( "withExternalModifier function", () => {
		it( "adds external modifiers", () => {
			const instance = new Modifier( 2 )
				.withExternalModifier( externalModifierPlus1 )
				.withExternalModifier( externalModifierPlus1 );

			expect( instance.externalModifiers ).toEqual( [ externalModifierPlus1, externalModifierPlus1 ] );
		} );

		it( "creates a new object and doesn't modify the existing object", () => {
			const instance = new Modifier( 2 );
			const modifiedInstance = instance.withExternalModifier( externalModifierPlus1 );
			expect( instance.externalModifiers ).toEqual( [] );
			expect( modifiedInstance.externalModifiers ).toEqual( [ externalModifierPlus1 ] );
		} );
	} );
} );
