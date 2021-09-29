import { flatten } from "@nestjs/common";
import { castArray } from "lodash";
import Character from "../character/entities/Character.entity";
import ModifierApplierInterface from "./interfaces/ModifierApplier.interface";
import { ModifierCollectorService } from "./ModifierCollector.service";
import ModificationTypesType from "./types/ModificationTypes.type";

export class ModifierListBuilder {
	private pendingQueries: Promise<ModifierApplierInterface[]>[];
	private filters: ModificationTypesType[];

	/**
	 * The constructor.
	 */
	public constructor( private readonly modifierCollectorService: ModifierCollectorService ) {
		this.pendingQueries = [];
	}

	public applyGearModifiers( character: Character ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherGearModifiers( character ) );
		return this;
	}

	public applyWeaponModifier( weapon: any ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherWeaponModifiers( weapon ) );
		return this;
	}

	public filterTypes( type: ModificationTypesType ): this;
	public filterTypes( types: ModificationTypesType[] ): this;
	public filterTypes( types: ModificationTypesType | ModificationTypesType[] ): this {
		this.filters.push( ...castArray( types ) );
		return this;
	}

	public async build(): Promise<ModifierApplierInterface[]> {
		const modifiers = await this.awaitQueries();
		return this.applyFilters( modifiers );
	}

	private async awaitQueries(): Promise<ModifierApplierInterface[]> {
		return flatten( await Promise.all( this.pendingQueries ) );
	}

	private applyFilters( modifiers: ModifierApplierInterface[] ): ModifierApplierInterface[] {
		return modifiers.filter( ( modifier: ModifierApplierInterface ) => this.filters.includes( modifier.type ) );
	}
}
