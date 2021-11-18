import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Character from "../domain/character/entities/Character.entity";
import CommandService from "./Command.service";
import CommandHistoryService from "./CommandHistory.service";
import Command from "./entities/Command.entity";
import { ExecutedCommand } from "./values/ExecutedCommand";

@Resolver( Command )
export default class CommandResolver {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		private readonly commandService: CommandService,
		private readonly commandHistoryService: CommandHistoryService,
	) {
	}

	/**
	 * Gets the history of executed commands.
	 *
	 * @param {number} characterId The id of the character to get the history for.
	 *
	 * @return {Promise<any>} The history.
	 */
	@Query( () => [ ExecutedCommand ] )
	public async commandHistory(
		@Args( "characterId", { type: () => Int } ) characterId: number,
	): Promise<ExecutedCommand[]> {
		const history = await this.commandHistoryService.getCommandHistory( characterId );
		return Promise.all( history.getArray().reverse().map( async ( command: Command ): Promise<ExecutedCommand> => {
			const info = await this.commandService.getCommandInfo( command );
			return new ExecutedCommand( command, info.name, info.description );
		} ) );
	}

	/**
	 * Undoes the last command execution.
	 *
	 * @param {number} characterId The id of the character to undo the last command for.
	 *
	 * @return {Promise<Character>} The character after undoing the action.
	 */
	@Mutation( () => [ ExecutedCommand ] )
	public async undoLastCommand(
		@Args( "characterId", { type: () => Int } ) characterId: number,
	): Promise<ExecutedCommand[]> {
		await this.commandService.undoLastCommand( characterId );
		return await this.commandHistory( characterId );
	}

	/**
	 * Redoes the command execution that was last undone.
	 *
	 * @param {number} characterId The id of the character to redo the last undone command for.
	 *
	 * @return {Promise<Character>} The character after redoing the action.
	 */
	@Mutation( () => [ ExecutedCommand ] )
	public async redoLastUndoneCommand(
		@Args( "characterId", { type: () => Int } ) characterId: number,
	): Promise<ExecutedCommand []> {
		await this.commandService.redoLastUndoneCommand( characterId );
		return await this.commandHistory( characterId );
	}
}
