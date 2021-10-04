import ModificationTypesType from "../types/ModificationTypes.type";
import ExternalModifier from "./ExternalModifier.valueobject";
import Modifier from "./Modifier.valueobject";

describe( "The Modifier", () => {
	describe( "value getter", () => {
		it.each( [ 1, 6, 9, 0, -1, -20 ] )( "returns the given value", ( base: number ) => {
			const instance = new Modifier( base );
			expect( instance.value ).toEqual( base );
		} );
	} );

	describe( "toString function", () => {
		it.each(
			[
				[ 1, "+1" ],
				[ 65, "+65" ],
				[ 0, "+0" ],
				[ -0, "+0" ],
				[ -1, "-1" ],
				[ -62, "-62" ],
			],
		)( "displays the Modifier in a human readable way", ( base: number, expected: string ) => {
			const instance = new Modifier( base );
			expect( instance.toString() ).toEqual( expected );
			expect( instance.displayValue ).toEqual( expected );
		} );
	} );

	describe( "has external modifiers", () => {
		const externalModifier1: ExternalModifier = new ExternalModifier(
			"testing",
			ModificationTypesType.SKILL,
			new Modifier( 1 ),
			false,
		);

		const externalModifier2: ExternalModifier = new ExternalModifier(
			"more testing",
			ModificationTypesType.ARMOR_CLASS,
			new Modifier( 2 ),
			false,
		);

		const externalModifierSituational: ExternalModifier = new ExternalModifier(
			"situational",
			ModificationTypesType.ABILITY,
			new Modifier( 4 ),
			true,
			"situational",
		);

		it( "gets and sets modifiers", () => {
			const instance = new Modifier( 2 );

			instance.addExternalModifier( externalModifier1 );
			instance.addExternalModifier( externalModifier1 );
			expect( instance.externalModifiers ).toEqual( [ externalModifier1, externalModifier1 ] );
		} );

		it.each( [
			{ base: 2, externalModifiers: [ externalModifier1 ], expectedValue: 3 },
			{ base: -2, externalModifiers: [ externalModifier1, externalModifier2 ], expectedValue: 1 },
		] )( "modifies the parent modifier value", ( { base, externalModifiers, expectedValue } ) => {
			const instance = new Modifier( base );
			instance.addExternalModifier( ...externalModifiers );
			expect( instance.value ).toEqual( expectedValue );
		} );

		it( "doesn't include situational modifiers in the total value", () => {
			const instance = new Modifier( 2 );
			instance.addExternalModifier( externalModifier1, externalModifierSituational );
			expect( instance.value ).toEqual( 3 );
		} );

		it( "modifies the parent modifier value recursively", () => {
			const instance = new Modifier( 5 );
			externalModifier1.modifier.addExternalModifier( externalModifier2 );
			instance.addExternalModifier( externalModifier1 );
			expect( instance.value ).toEqual( 8 );
			expect( instance.toString() ).toEqual( "+8" );
		} );
	} );
} );
