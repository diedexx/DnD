import { Injectable } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import ModifierApplierInterface from "./interfaces/ModifierApplier.interface";
import { ModifierCollectorService } from "./ModifierCollector.service";
import { ModifierListBuilder } from "./ModifierList.builder";
import ModificationTypesType from "./types/ModificationTypes.type";

@Injectable()
export class ModifierOrchestratorService {

	/**
	 * The constructor.
	 */
	public constructor( private readonly modifierCollectorService: ModifierCollectorService ) {
	}

	public async applyAttackRollModifiers( character: Character, weapon: any ): Promise<ModifierApplierInterface[]> {
		return new ModifierListBuilder( this.modifierCollectorService )
			.applyWeaponModifier( weapon )
			.applyGearModifiers( character )
			.filterTypes( ModificationTypesType.ATTACK_ROLL )
			.build();
	}
}
