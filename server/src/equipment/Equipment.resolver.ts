import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../Base.resolver";
import RelationLoaderService from "../database/RelationLoader.service";
import Modification from "../modifier/entities/Modification.entity";
import ExternalModifier from "../modifier/values/ExternalModifier.value";
import Equipment from "./entities/Equipment.entity";

@Resolver( () => Equipment )
export default class EquipmentResolver extends BaseResolver( Equipment, "equipmentPiece", "equipmentPieces" ) {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Equipment )
		private readonly equipmentRepository: Repository<Equipment>,
		private readonly relationLoaderService: RelationLoaderService,
	) {
		super( equipmentRepository );
	}

	/**
	 * Gets the bonuses of a piece of equipment.
	 *
	 * @param {Equipment} equipment The equipment to get the bonuses for.
	 *
	 * @return {Promise<Property[]>} The bonuses of the equipment piece.
	 */
	@ResolveField( "bonuses", () => [ ExternalModifier ] )
	public async getBonuses( @Parent() equipment: Equipment ): Promise<ExternalModifier[]> {
		return ( await this.relationLoaderService.loadRelations( equipment, [ "bonuses.sourceEquipment" ] ) )
			.bonuses
			.map( ( bonus: Modification ) => bonus.externalModifier );
	}
}
