import { Injectable } from "@nestjs/common";
import RelationLoaderService from "../database/RelationLoader.service";
import CommandHistoryService from "./CommandHistory.service";
import CommandProviderService from "./CommandProvider.service";
import Command from "./entities/Command.entity";
import CannotExecuteCommand from "./exceptions/CannotExecuteCommand.exception";
import CommandInterface from "./interfaces/Command.interface";

@Injectable()
export default class CommandExecutorService {
	/**
	 * The constructor.
	 */
	public constructor(
		private readonly commandProviderService: CommandProviderService,
		private readonly relationLoaderService: RelationLoaderService,
		private readonly commandHistoryService: CommandHistoryService,
	) {
	}

	/**
	 * Executes a command.
	 *
	 * @param {Command} command The command to execute.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async executeCommand( command: Command ): Promise<void> {
		if ( command.executedAt ) {
			throw CannotExecuteCommand.becauseAlreadyExecuted();
		}

		if ( ! command.character ) {
			command = await this.relationLoaderService.loadRelations( command, [ "character" ] );
		}

		const commandExecutor: CommandInterface = this.commandProviderService.getCommand( command.type );
		const undoCommandReference = await commandExecutor.execute( command.data, command.character );

		command.undoCommand = Command.createFromReference( undoCommandReference, command.character );
		command.executedAt = new Date();

		await this.commandHistoryService.addToHistory( command );
	}

	/**
	 * Undoes a command execution.
	 *
	 * @param {Command} command The command to undo.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async undoCommand( command: Command ) {
		command = await this.relationLoaderService.loadRelations( command, [ "undoCommand.character" ] );

		const undoCommand = command.undoCommand;
		const undoCommandExecutor: CommandInterface = this.commandProviderService.getCommand( undoCommand.type );
		await undoCommandExecutor.execute( undoCommand.data, undoCommand.character );

		undoCommand.executedAt = undoCommand.executedAt || new Date();
		command.undone = true;

		await this.commandHistoryService.updateInHistory( command );
	}

	/**
	 * Undoes a command execution.
	 *
	 * @param {Command} command The command to undo.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async redoCommand( command: Command ) {
		command = await this.relationLoaderService.loadRelations( command, [ "character" ] );
		const commandExecutor: CommandInterface = this.commandProviderService.getCommand( command.type );
		await commandExecutor.execute( command.data, command.character );
		command.undone = false;

		await this.commandHistoryService.updateInHistory( command );
	}
}
