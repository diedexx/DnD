import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import BaseResolver from "../Base.resolver";
import Character from "../character/entities/Character.entity";
import RelationLoaderService from "../database/RelationLoader.service";
import Modifier from "../modifier/models/Modifier.valueobject";
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
	 * Gets the character to whom the weapon belongs.
	 *
	 * @param {AbilityScore} abilityScore The abilityScore to get the character for.
	 *
	 * @return {Promise<Skill>} The character to whom the ability score belongs.
	 */
	@ResolveField( "character", () => [ Character ] )
	public async getCharacter( @Parent() abilityScore: AbilityScore ): Promise<Character> {
		return ( await this.relationLoaderService.loadRelations( abilityScore, [ "character" ] ) ).character;
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
