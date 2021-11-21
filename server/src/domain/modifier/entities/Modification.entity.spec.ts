import Equipment from "../../equipment/entities/Equipment.entity";
import { Weapon } from "../../weapon/entities/Weapon.entity";
import ModificationType from "../types/ModificationType.type";
import ExternalModifier from "../values/ExternalModifier.value";
import Modifier from "../values/Modifier.value";
import Modification from "./Modification.entity";

describe( "The Modification entity", () => {
	describe( "externalModifier getter", () => {
		let modification: Modification;

		beforeEach( () => {
			modification = new Modification();
			modification.type = ModificationType.NOTHING;
			modification.modifier = 3;
			modification.situational = false;
		} );
		it( "should get an externalModifier representation of itself", () => {
			const expected = new ExternalModifier(
				"unknown source",
				ModificationType.NOTHING,
				new Modifier( 3 ),
				false,
			);
			expect( modification.externalModifier ).toStrictEqual( expected );
		} );

		it( "should use the name of the equipment as source it it has a sourceEquipment value", () => {
			modification.sourceEquipment = new Equipment();
			modification.sourceEquipment.name = "test equipment";

			const expected = new ExternalModifier(
				"test equipment",
				ModificationType.NOTHING,
				new Modifier( 3 ),
				false,
			);

			expect( modification.externalModifier ).toStrictEqual( expected );
		} );

		it( "should default to \"unknown equipment\" when the equipment has no name", () => {
			modification.sourceEquipment = new Equipment();

			const expected = new ExternalModifier(
				"unknown equipment",
				ModificationType.NOTHING,
				new Modifier( 3 ),
				false,
			);

			expect( modification.externalModifier ).toStrictEqual( expected );
		} );

		it( "should use the name of the weapon as source if it has a sourceWeapon value", () => {
			modification.sourceWeapon = new Weapon();
			modification.sourceWeapon.name = "test weapon";

			const expected = new ExternalModifier(
				"test weapon",
				ModificationType.NOTHING,
				new Modifier( 3 ),
				false,
			);

			expect( modification.externalModifier ).toStrictEqual( expected );
		} );

		it( "should default to \"unknown weapon\" when the weapon has no name", () => {
			modification.sourceWeapon = new Weapon();

			const expected = new ExternalModifier(
				"unknown weapon",
				ModificationType.NOTHING,
				new Modifier( 3 ),
				false,
			);

			expect( modification.externalModifier ).toStrictEqual( expected );
		} );

		it( "should mirror the situational and description field", () => {
			modification.situational = true;
			modification.description = "Only when testing";

			const expected = new ExternalModifier(
				"unknown source",
				ModificationType.NOTHING,
				new Modifier( 3 ),
				true,
				"Only when testing",
			);

			expect( modification.externalModifier ).toStrictEqual( expected );
		} );
	} );
} );
