import { Injectable } from "@nestjs/common";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "../domain/character/entities/Character.entity";
import CommandExecutorService from "./CommandExecutor.service";
import CommandHistoryService from "./CommandHistory.service";
import CommandProviderService from "./CommandProvider.service";
import Command from "./entities/Command.entity";
import CommandReference from "./interfaces/CommandReference.interface";

@Injectable()
export default class CommandService {
	/**
	 * The constructor.
	 */
	public constructor(
		private readonly commandHistoryService: CommandHistoryService,
		private readonly commandExecutorService: CommandExecutorService,
		private readonly relationLoaderService: RelationLoaderService,
		private readonly commandProviderService: CommandProviderService,
	) {
	}

	/**
	 * Executes a command by giving a reference to a command.
	 *
	 * @template T
	 *
	 * @param {CommandReference<T>} commandReference The reference to a command.
	 * @param {Character} character The character to execute the command for.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async executeCommand<T>( commandReference: CommandReference<T>, character: Character ): Promise<void> {
		const command: Command = Command.createFromReference( commandReference, character );
		return this.commandExecutorService.executeCommand( command );
	}

	/**
	 * Undoes the last command execution.
	 *
	 * @param {number} characterId The id of the character to undo the last command for.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async undoLastCommand( characterId: number ) {
		const history = await this.commandHistoryService.getCommandHistory( characterId, false );
		const lastCommandNode = history.getLast();
		if ( ! lastCommandNode ) {
			return;
		}
		await this.commandExecutorService.undoCommand( lastCommandNode.data );
	}

	/**
	 * Redoes the command that was last undone.
	 *
	 * @param {number} characterId The id of the character to redo the last undone command for.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async redoLastUndoneCommand( characterId: number ) {
		const history = await this.commandHistoryService.getCommandHistory( characterId, true );
		let targetCommandNode = history.getLast();
		if ( ! targetCommandNode || ! targetCommandNode.data.undone ) {
			return;
		}
		while ( targetCommandNode.prev && targetCommandNode.prev.data.undone ) {
			targetCommandNode = targetCommandNode.prev;
		}

		await this.commandExecutorService.redoCommand( targetCommandNode.data );
	}

	/**
	 * Gets information about a command.
	 *
	 * @param {Command} command The command.
	 *
	 * @return {Promise<{name: string, description: string}>} An object with the command name and description.
	 */
	public async getCommandInfo( command: Command ): Promise<{ name: string, description: string }> {
		command = await this.relationLoaderService.loadRelations( command, [ "character" ] );
		const commandExecutor = this.commandProviderService.getCommand( command.type );
		return {
			name: await commandExecutor.getName( command.data, command.character ),
			description: await commandExecutor.getDescription( command.data, command.character ),
		};
	}
}
