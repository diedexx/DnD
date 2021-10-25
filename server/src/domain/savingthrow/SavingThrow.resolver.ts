import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Ability from "../ability/entities/Ability.entity";
import BaseResolver from "../../Base.resolver";
import RelationLoaderService from "../../database/RelationLoader.service";
import Modifier from "../modifier/values/Modifier.value";
import SavingThrow from "./entities/SavingThrow.entity";
import SavingThrowService from "./SavingThrow.service";

@Resolver( SavingThrow )
export default class SavingThrowResolver extends BaseResolver( SavingThrow, "savingThrow", "savingThrows" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<SavingThrow>} savingThrowRepository The SavingThrow repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 * @param {AbilityScoreService} savingThrowService A service that knows about saving throws.
	 */
	constructor(
		@InjectRepository( SavingThrow )
		private readonly savingThrowRepository: Repository<SavingThrow>,
		private readonly relationLoaderService: RelationLoaderService,
		private readonly savingThrowService: SavingThrowService,
	) {
		super( savingThrowRepository );
	}

	/**
	 * Get the ability that benefits a saving throw.
	 *
	 * @param {SavingThrow} savingThrow The savingThrow to get the ability for.
	 *
	 * @return {Promise<SavingThrow>} The ability that benefit this saving throw.
	 */
	@ResolveField( "ability", () => Ability )
	public async getAbility( @Parent() savingThrow: SavingThrow ): Promise<Ability> {
		return ( await this.relationLoaderService.loadRelations( savingThrow, [ "ability" ] ) ).ability;
	}

	/**
	 * Gets the modifier for the saving throw.
	 *
	 * @param {SavingThrow} savingThrow The savingThrow to get the modifier for.
	 *
	 * @return {Promise<Modifier>} The modifier.
	 */
	@ResolveField( "modifier", () => Modifier )
	public async getModifier( @Parent() savingThrow: SavingThrow ): Promise<Modifier> {
		return await this.savingThrowService.getSavingThrowModifier( savingThrow );
	}
}
