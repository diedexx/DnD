import ModificationTypesType from "../types/ModificationTypes.type";
import ExternalModifier from "./ExternalModifier.valueobject";
import Modifier from "./Modifier.valueobject";

describe( "The ExternalModifier class", () => {
	describe( "constructor", () => {
		it( "requires descriptions for situational externalModifiers", () => {
			expect( () => {
				new ExternalModifier(
					"non-situational modifier without description",
					ModificationTypesType.ATTACK_ROLL,
					new Modifier( 0 ),
					false,
				);

				new ExternalModifier(
					"non-situational modifier with description",
					ModificationTypesType.ATTACK_ROLL,
					new Modifier( 0 ),
					false,
					"description is optional",
				);
			} ).not.toThrow();

			expect( () => {
				new ExternalModifier(
					"situational modifier without description",
					ModificationTypesType.ATTACK_ROLL,
					new Modifier( 0 ),
					true );
			} )
				.toThrowErrorMatchingInlineSnapshot( "\"All situational external modifiers must have a descriptions\"" );
		} );
	} );
} );
