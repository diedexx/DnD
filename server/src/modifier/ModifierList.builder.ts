import { flatten } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import SkillScore from "../skill/entities/SkillScore.entity";
import { Weapon } from "../weapon/entities/Weapon.entity";
import ExternalModifier from "./models/ExternalModifier.valueobject";
import { ModifierCollectorService } from "./ModifierCollector.service";
import ModificationTypesType from "./types/ModificationTypes.type";

export class ModifierListBuilder {
	private readonly pendingQueries: Promise<ExternalModifier[]>[];
	private readonly filters: ModificationTypesType[];

	/**
	 * The constructor.
	 *
	 * @param {ModifierCollectorService} modifierCollectorService A service which collects modifiers.
	 */
	public constructor( private readonly modifierCollectorService: ModifierCollectorService ) {
		this.pendingQueries = [];
		this.filters = [];
	}

	/**
	 * Applies all modifiers that the owned gear gives.
	 *
	 * @param {Character} character The character to apply gear modifiers for.
	 *
	 * @return {this} The builder.
	 */
	public applyGearModifiers( character: Character ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherGearModifiers( character ) );
		return this;
	}

	/**
	 * Applies all modifiers that a specific weapon gives.
	 *
	 * @param {Weapon} weapon The weapon to get modifiers for.
	 *
	 * @return {this} The builder.
	 */
	public applyWeaponModifier( weapon: Weapon ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherWeaponModifiers( weapon ) );
		return this;
	}

	/**
	 * Applies all modifiers that weapon proficiency gives for a specific weapon.
	 *
	 * @param {Weapon} weapon The weapon to get the proficiency bonus for.
	 *
	 * @return {this} The builder
	 */
	public applyWeaponProficiencyModifiers( weapon: Weapon ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherWeaponProficiencyModifiers( weapon ) );
		return this;
	}

	/**
	 * Applies all modifiers that a proficiency adds to a specific skillScore.
	 *
	 * @param {SkillScore} skillScore The skillScore.
	 *
	 * @return {this} The builder.
	 */
	public applySkillProficiencyModifiers( skillScore: SkillScore ): this {
		if ( skillScore.isProficient ) {
			this.pendingQueries.push( this.modifierCollectorService.gatherSkillProficiencyModifiers() );
		}

		return this;
	}

	/**
	 * Filters out all modifiers that don't match the type.
	 *
	 * @param {ModificationTypesType[]} types The types to keep.
	 *
	 * @return {this} The builder.
	 */
	public filterTypes( ...types: ModificationTypesType[] ): this {
		this.filters.push( ...types );
		return this;
	}

	/**
	 * Build the list of applicable external modifiers.
	 *
	 * @return {Promise<ExternalModifier[]>} The external modifiers.
	 */
	public async build(): Promise<ExternalModifier[]> {
		const modifiers = await this.queryResults();
		return this.applyFilters( modifiers );
	}

	/**
	 * Gets and comines the results of all pending queries.
	 *
	 * @return {Promise<ExternalModifier[]>} The combined list of external modifiers.
	 *
	 * @private
	 */
	private async queryResults(): Promise<ExternalModifier[]> {
		return flatten( await Promise.all( this.pendingQueries ) );
	}

	/**
	 * Apply the registered filters.
	 *
	 * @param {ExternalModifier[]} modifiers The list of external modifiers to filter.
	 *
	 * @return {ExternalModifier[]} The filtered list of external modifiers.
	 *
	 * @private
	 */
	private applyFilters( modifiers: ExternalModifier[] ): ExternalModifier[] {
		return modifiers.filter( ( modifier: ExternalModifier ) => this.filters.includes( modifier.type ) );
	}
}
