import Dice from "../../die/models/Dice.valueobject";
import Modifier from "../../modifier/models/Modifier.valueobject";
import DamageType from "../types/DamageType.type";
import { DamageRoll } from "./DamageRoll.valueobject";

describe( "The DamageRoll value object", () => {
	describe( "constructor", () => {
		it( "rejects invalid damage types", () => {
			expect( () => {
				new DamageRoll( new Dice( 2, 8 ), new Modifier( 2 ), "Testing" );
			} ).toThrowErrorMatchingInlineSnapshot( "\"Invalid damage type: Testing\"" );
		} );
	} );
	describe( "toString function", () => {
		it( "transforms an object into a human readable string", () => {
			const actual = new DamageRoll( new Dice( 2, 8 ), new Modifier( 2 ), DamageType.PIERCING );
			expect( actual.toString() ).toBe( "2d8 +2 Piercing" );
		} );
	} );

	describe( "from function", () => {
		it( "transforms a valid string into a Damage object", () => {
			const damageRoll = DamageRoll.from( "2d8 +2 Piercing" );
			expect( damageRoll ).toMatchInlineSnapshot( `
DamageRoll {
  "dice": Dice {
    "die": Die {
      "sides": 8,
    },
    "numberOfDice": 2,
  },
  "modifier": Modifier {
    "base": 2,
    "externalModifiers": Array [],
  },
  "type": "Piercing",
}
` );
		} );

		it( "transforms a valid string with larger numbers into a Damage object", () => {
			const damageRoll = DamageRoll.from( "20d100 +38 Piercing" );
			expect( damageRoll ).toMatchInlineSnapshot( `
DamageRoll {
  "dice": Dice {
    "die": Die {
      "sides": 100,
    },
    "numberOfDice": 20,
  },
  "modifier": Modifier {
    "base": 38,
    "externalModifiers": Array [],
  },
  "type": "Piercing",
}
` );
		} );

		it( "Catches invalid input", () => {
			expect( () => DamageRoll.from( "" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Invalid damage string format. Could not parse \"" );

			expect( () => DamageRoll.from( "2d8" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Invalid damage string format. Could not parse 2d8\"" );

			expect( () => DamageRoll.from( "2d8 +2" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Invalid damage string format. Could not parse 2d8 +2\"" );

			expect( () => DamageRoll.from( "2d8+2Piercing" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Invalid damage string format. Could not parse 2d8+2Piercing\"" );

			expect( () => DamageRoll.from( "2d112 +3 Piercing" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Invalid number of sides. There is no die with 112 sides.\"" );

			expect( () => DamageRoll.from( "+3 Piercing" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Invalid damage string format. Could not parse +3 Piercing\"" );

			expect( () => DamageRoll.from( "2d10 +2 Testing" ) )
				.toThrowErrorMatchingInlineSnapshot( "\"Invalid damage type: Testing\"" );
		} );
	} );
} );
