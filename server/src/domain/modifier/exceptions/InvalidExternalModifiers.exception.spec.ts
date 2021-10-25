import InvalidExternalModifier from "./InvalidExternalModifier.exception";

describe( "The InvalidExternalModifier", () => {
	describe( "becauseOfMissingDescription function", () => {
		it( "creates a new InvalidExternalModifier exception", () => {
			expect( InvalidExternalModifier.becauseOfMissingDescription() )
				.toMatchInlineSnapshot( "[Error: All situational external modifiers must have a descriptions]" );
		} );
	} );
} );
