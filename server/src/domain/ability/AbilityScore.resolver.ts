import { Args, Int, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BaseResolver from "../../Base.resolver";
import CommandService from "../../command/Command.service";
import CommandReference from "../../command/interfaces/CommandReference.interface";
import RelationLoaderService from "../../database/RelationLoader.service";
import Character from "../character/entities/Character.entity";
import AbilityScoreService from "./AbilityScore.service";
import { TYPE as updateAbilityScoreCommandType, UpdateAbilityScoreData } from "./commands/UpdateAbilityScore.command";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";

@Resolver( AbilityScore )
export default class AbilityScoreResolver extends BaseResolver( AbilityScore, "abilityScore", "abilityScores" ) {
	/**
	 * The constructor.
	 *
	 * @param {Repository<AbilityScore>} abilityScoreRepository The AbilityScore repo.
	 * @param {Repository<Character>} characterRepository The Character repo.
	 * @param {CommandService} commandService A service that executes commands.
	 * @param {RelationLoaderService} relationLoaderService A service that resolves entity relations.
	 * @param {AbilityScoreService} abilityScoreService A service that manages AbilityScores.
	 */
	constructor(
		@InjectRepository( AbilityScore )
		private readonly abilityScoreRepository: Repository<AbilityScore>,
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		private readonly commandService: CommandService,
		private readonly relationLoaderService: RelationLoaderService,
		private readonly abilityScoreService: AbilityScoreService,
	) {
		super( abilityScoreRepository );
	}

	/**
	 * Gets the character to whom the ability score belongs.
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
	 * Gets the ability that the ability score is for.
	 *
	 * @param {AbilityScore} abilityScore The abilityScore to get the ability for.
	 *
	 * @return {Promise<Skill>} The ability the ability score is for.
	 */
	@ResolveField( "ability", () => Ability )
	public async getAbility( @Parent() abilityScore: AbilityScore ): Promise<Ability> {
		return ( await this.relationLoaderService.loadRelations( abilityScore, [ "ability" ] ) ).ability;
	}

	/**
	 * Updates the score value of an ability score.
	 *
	 * @param {number} abilityScoreId The id of the ability score.
	 * @param {number} newValue The new value to set.
	 *
	 * @return {Promise<AbilityScore>} The updated ability score.
	 */
	@Mutation( () => AbilityScore )
	public async updateAbilityScore(
		@Args( "abilityScoreId", { type: () => Int } ) abilityScoreId: number,
		@Args( "newValue", { type: () => Int } ) newValue: number,
	): Promise<AbilityScore> {
		const commandReference: CommandReference<UpdateAbilityScoreData> = {
			data: { abilityScoreId, newValue },
			type: updateAbilityScoreCommandType,
		};
		const abilityScore: AbilityScore = await this.abilityScoreRepository.findOneOrFail( abilityScoreId );
		const character = await this.characterRepository.findOneOrFail( abilityScore.characterId );

		const command = await this.commandService.createCommand( commandReference, character );
		await this.commandService.executeCommand( command );

		return await this.abilityScoreRepository.findOneOrFail( abilityScoreId );
	}
}
