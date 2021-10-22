import { get, has } from "lodash";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Equipment from "../../equipment/entities/Equipment.entity";
import { Weapon } from "../../weapon/entities/Weapon.entity";
import ModificationType from "../types/ModificationType.type";
import ExternalModifier from "../values/ExternalModifier.value";
import Modifier from "../values/Modifier.value";

@Entity()
export default class Modification extends BaseEntity {
	@ManyToOne( () => Equipment, { nullable: true } )
	public sourceEquipment: Equipment;

	@Column( { nullable: true } )
	@RelationId( ( modification: Modification ) => modification.sourceEquipment )
	public readonly sourceEquipmentId: number;

	@ManyToOne( () => Weapon, { nullable: true } )
	public sourceWeapon: Weapon;

	@Column( { nullable: true } )
	@RelationId( ( modification: Modification ) => modification.sourceWeapon )
	public readonly sourceWeaponId: number;

	@Column( {
		type: "enum",
		"enum": ModificationType,
		"default": ModificationType.NOTHING,
	} )
	public type: ModificationType;

	@Column()
	public modifier: number;

	@Column()
	public situational: boolean;

	@Column( { nullable: true } )
	public description?: string;

	/**
	 * Gets the externalModifier value representation of this modification.
	 *
	 * @return {ExternalModifier} The externalModifier value representation of this modification.
	 */
	public get externalModifier(): ExternalModifier {
		return new ExternalModifier(
			this.source,
			this.type,
			new Modifier( this.modifier ),
			this.situational,
			this.description,
		);
	}

	/**
	 * Gets a description of the source of the modification. Either the weapon or equipment name.
	 *
	 * @return {string} The description.
	 */
	private get source(): string {
		if ( has( this, "sourceEquipment.name" ) ) {
			return get( this, "sourceEquipment.name", "unknown equipment" );
		}
		if ( has( this, "sourceWeapon.name" ) ) {
			return get( this, "sourceWeapon.name", "unknown weapon" );
		}
		return "unknown source";
	}
}
