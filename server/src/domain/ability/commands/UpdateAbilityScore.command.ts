import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommandProviderService from "../../../infrastructure/command/CommandProvider.service";
import { AbstractCommand } from "../../../infrastructure/command/commands/AbstractCommand";
import CommandReference from "../../../infrastructure/command/interfaces/CommandReference.interface";
import RelationLoaderService from "../../../infrastructure/database/RelationLoader.service";
import AbilityScoreService from "../AbilityScore.service";
import AbilityScore from "../entities/AbilityScore.entity";

export const TYPE = "UPDATE_ABILITY_SCORE";

export interface UpdateAbilityScoreData {
	abilityScoreId: number;
	newValue: number;
}

export default class UpdateAbilityScoreCommand extends AbstractCommand<UpdateAbilityScoreData> {
	/**
	 * The constructor.
	 *
	 * @param {Repository<AbilityScore>} abilityScoreRepository The character repo.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 * @param {AbilityScoreService} abilityScoreService A service manages abilityScores.
	 * @param {CommandProviderService} commandProviderService A service that provides commands.
	 */
	public constructor(
		@InjectRepository( AbilityScore )
		private readonly abilityScoreRepository: Repository<AbilityScore>,
		private readonly relationLoaderService: RelationLoaderService,
		private readonly abilityScoreService: AbilityScoreService,
		commandProviderService: CommandProviderService,
	) {
		super( commandProviderService );
	}

	/**
	 * @inheritDoc
	 */
	public async getDescription( data: UpdateAbilityScoreData ): Promise<string> {
		const abilityScore: AbilityScore = await this.abilityScoreRepository.findOneOrFail( data.abilityScoreId );
		const { ability } = await this.relationLoaderService.loadRelations( abilityScore, [ "ability" ] );
		return "Change " + ability.name + " to " + data.newValue + ".";
	}

	/**
	 * @inheritDoc
	 */
	public async getName(): Promise<string> {
		return "Update ability score";
	}

	/**
	 * @inheritDoc
	 */
	protected async perform( data: UpdateAbilityScoreData ): Promise<CommandReference> {
		const abilityScore: AbilityScore = await this.abilityScoreRepository.findOneOrFail( data.abilityScoreId );
		const oldValue: number = abilityScore.score.value;
		await this.abilityScoreService.updateAbilityScore( data.abilityScoreId, data.newValue );

		return {
			type: this.getType(),
			data: { abilityScoreId: data.abilityScoreId, newValue: oldValue } as UpdateAbilityScoreData,
		};
	}

	/**
	 * @inheritDoc
	 */
	protected validateData(): boolean {
		return true;
	}

	/**
	 * @inheritDoc
	 */
	public getType(): string {
		return TYPE;
	}
}
