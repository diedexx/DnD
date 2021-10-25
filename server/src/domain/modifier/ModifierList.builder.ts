import { flatten } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import SavingThrow from "../savingthrow/entities/SavingThrow.entity";
import SkillScore from "../skill/entities/SkillScore.entity";
import { Weapon } from "../weapon/entities/Weapon.entity";
import ExternalModifier from "./values/ExternalModifier.value";
import { ModifierCollectorService } from "./ModifierCollector.service";
import ModificationType from "./types/ModificationType.type";

export class ModifierListBuilder {
	private readonly pendingQueries: Promise<ExternalModifier[]>[];
	private readonly filters: ModificationType[];

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
	 * Applies all modifiers that the owned equipment gives.
	 *
	 * @param {Character} character The character to apply equipment modifiers for.
	 *
	 * @return {this} The builder.
	 */
	public applyEquipmentModifiers( character: Character ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherEquipmentModifiers( character ) );
		return this;
	}

	/**
	 * Applies all modifiers that a specific weapon gives.
	 *
	 * @param {Weapon} weapon The weapon to get modifiers for.
	 *
	 * @return {this} The builder.
	 */
	public applyWeaponModifiers( weapon: Weapon ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherWeaponModifiers( weapon ) );
		return this;
	}

	/**
	 * Applies all modifiers that ability modifiers give for a specific weapon attack.
	 *
	 * @param {Weapon} weapon The weapon to get the ability modifiers for.
	 *
	 * @return {this} The builder.
	 */
	public applyAttackRollAbilityModifier( weapon: Weapon ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherAttackRollAbilityModifier( weapon ) );
		return this;
	}

	/**
	 * Applies all modifiers that weapon proficiency gives for a specific weapon.
	 *
	 * @param {Weapon} weapon The weapon to get the proficiency bonus for.
	 *
	 * @return {this} The builder.
	 */
	public applyWeaponProficiencyModifiers( weapon: Weapon ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherWeaponProficiencyModifiers( weapon ) );
		return this;
	}


	/**
	 * Applies all modifiers that an ability adds to a specific skillScore.
	 *
	 * @param {SkillScore} skillScore The skillScore to apply the ability bonus to.
	 *
	 * @return {this} The builder.
	 */
	public applySkillScoreAbilityModifiers( skillScore: SkillScore ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherSkillScoreAbilityModifiers( skillScore ) );

		return this;
	}

	/**
	 * Applies all modifiers that a proficiency adds to a specific skillScore.
	 *
	 * @param {SkillScore} skillScore The skillScore to apply the proficiency bonus to.
	 *
	 * @return {this} The builder.
	 */
	public applySkillProficiencyModifiers( skillScore: SkillScore ): this {
		this.pendingQueries.push( this.modifierCollectorService.gatherSkillProficiencyModifiers( skillScore ) );

		return this;
	}

	/**
	 * Applies all modifiers that a proficiency adds to a specific savingThrow.
	 *
	 * @param {SkillScore} savingThrow The savingThrow to apply the proficiency bonus to./
	 *
	 * @return {this} The builder.
	 */
	public applySavingThrowProficiencyModifiers( savingThrow: SavingThrow ): this {
		if ( savingThrow.isProficient ) {
			this.pendingQueries.push( this.modifierCollectorService.gatherSavingThrowProficiencyModifiers( savingThrow ) );
		}

		return this;
	}

	/**
	 * Filters out all modifiers that don't match the type.
	 *
	 * @param {ModificationType[]} types The types to keep.
	 *
	 * @return {this} The builder.
	 */
	public filterTypes( ...types: ModificationType[] ): this {
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
	 * Gets and combines the results of all pending queries.
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
