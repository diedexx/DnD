import { Injectable } from "@nestjs/common";
import AbilityService from "../ability/Ability.service";
import Ability from "../ability/entities/Ability.entity";
import RelationLoaderService from "../../infrastructure/database/RelationLoader.service";
import Property from "../weapon/entities/Property.entity";
import { Weapon } from "../weapon/entities/Weapon.entity";

@Injectable()
export default class WeaponModifierService {
	/**
	 * The constructor.
	 */
	public constructor(
		private readonly relationLoaderService: RelationLoaderService,
		private readonly abilityService: AbilityService,
	) {
	}

	/**
	 * Gets the abilities that this weapon benefits from.
	 *
	 * @param {Weapon} weapon The weapon.
	 *
	 * @return {Promise<Ability[]>} The abilities that benefit an attack roll..
	 */
	public async getAttackRollAbilities( weapon: Weapon ): Promise<Ability[]> {
		const { properties } = await this.relationLoaderService.loadRelations( weapon, [ "properties" ] );
		let rollMelee = true;
		if ( properties.some( this.hasName( "Ranged" ) ) && ! properties.some( this.hasName( "Thrown" ) ) ) {
			rollMelee = false;
		}

		const strength = await this.abilityService.findAbilityByName( "Strength" );
		const dexterity = await this.abilityService.findAbilityByName( "Dexterity" );

		if ( properties.some( this.hasName( "Finesse" ) ) ) {
			return [ strength, dexterity ];
		}

		if ( ! rollMelee ) {
			return [ dexterity ];
		}
		return [ strength ];
	}

	/**
	 * Creates a callback for checking if a property has a name.
	 *
	 * @param {string} name The name to check.
	 *
	 * @return {Function} The callback to check a property against a name.
	 *
	 * @private
	 */
	private hasName( name: string ) {
		return ( property: Property ) => name === property.name;
	}
}
