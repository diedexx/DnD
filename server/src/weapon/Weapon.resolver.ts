import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../Base.resolver";
import Character from "../character/entities/Character.entity";
import RelationLoaderService from "../database/RelationLoader.service";
import Modification from "../modifier/entities/Modification.entity";
import ExternalModifier from "../modifier/values/ExternalModifier.value";
import Modifier from "../modifier/values/Modifier.value";
import Property from "./entities/Property.entity";
import { Weapon } from "./entities/Weapon.entity";
import WeaponService from "./weapon.service";

@Resolver( Weapon )
export default class WeaponResolver extends BaseResolver( Weapon, "weapon", "weapons" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<Weapon>} weaponRepository The weapon repo.
	 * @param {WeaponService} weaponService A service responsible for managing weapons..
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 */
	public constructor(
		@InjectRepository( Weapon )
		private readonly weaponRepository: Repository<Weapon>,
		private readonly weaponService: WeaponService,
		private readonly relationLoaderService: RelationLoaderService,
	) {
		super( weaponRepository );
	}

	/**
	 * Gets the owner of a weapon.
	 *
	 * @param {Weapon} weapon The weapon to get the owner for.
	 *
	 * @return {Promise<Character>} The owner of the weapon.
	 */
	@ResolveField( "owner", () => [ Character ] )
	public async getOwner( @Parent() weapon: Weapon ): Promise<Character> {
		return ( await this.relationLoaderService.loadRelations( weapon, [ "owner" ] ) ).owner;
	}

	/**
	 * Gets the properties of a weapon.
	 *
	 * @param {Weapon} weapon The weapon to get the properties for.
	 *
	 * @return {Promise<Property[]>} The properties of the weapon.
	 */
	@ResolveField( "properties", () => [ Property ] )
	public async getProperties( @Parent() weapon: Weapon ): Promise<Property[]> {
		return ( await this.relationLoaderService.loadRelations( weapon, [ "properties" ] ) ).properties;
	}

	/**
	 * Gets the bonuses of a weapon.
	 *
	 * @param {Weapon} weapon The weapon to get the bonuses for.
	 *
	 * @return {Promise<ExternalModifier[]>} The bonuses of the weapon.
	 */
	@ResolveField( "bonuses", () => [ ExternalModifier ] )
	public async getBonuses( @Parent() weapon: Weapon ): Promise<ExternalModifier[]> {
		return ( await this.relationLoaderService.loadRelations( weapon, [ "bonuses.sourceWeapon" ] ) )
			.bonuses
			.map( ( bonus: Modification ) => bonus.externalModifier );
	}

	/**
	 * Get the attack roll modifier.
	 *
	 * @param {Modifier} weapon The weapon to get the modifier for.
	 *
	 * @return {Promise<Modifier>} The modifier for the attack roll.
	 */
	@ResolveField( "attackRollModifier", () => Modifier )
	public async getModifier( @Parent() weapon: Weapon ): Promise<Modifier> {
		return this.weaponService.getAttackRollModifier( weapon );
	}
}
