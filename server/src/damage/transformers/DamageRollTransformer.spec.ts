import Dice from "../../die/models/Dice.valueobject";
import Modifier from "../../modifier/models/Modifier.valueobject";
import { DamageRoll } from "../models/DamageRoll.valueobject";
import DamageType from "../types/DamageType.type";
import DamageRollTransformer from "./DamageRollTransformer";

describe( "The DamageRollTransformer", () => {
	const damageRollTransformer = new DamageRollTransformer();

	const map = [
		[
			"2d10 +2 Slashing",
			new DamageRoll(
				new Dice( 2, 10 ),
				new Modifier( 2 ),
				DamageType.SLASHING,
			),
		],
		[
			"10d100 -2 Piercing",
			new DamageRoll(
				new Dice( 10, 100 ),
				new Modifier( -2 ),
				DamageType.PIERCING,
			),
		],
	];
	describe( "from function", () => {
		it.each( map )( "transforms database values into DamageRoll objects: %p", ( storedValue: string, damageRollObject: DamageRoll ) => {
			expect( damageRollTransformer.from( storedValue ) ).toStrictEqual( damageRollObject );
		} );
	} );

	describe( "to function", () => {
		it.each( map )( "transforms DamageRoll objects into database values: %p", ( storedValue: string, damageRollObject: DamageRoll ) => {
			expect( damageRollTransformer.to( damageRollObject ) ).toBe( storedValue );
		} );
	} );
} );
