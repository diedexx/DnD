import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, IsNull, Not, Repository } from "typeorm";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "../domain/character/entities/Character.entity";
import LinkedList from "../structures/linkedList/LinkedList";
import CommandProviderService from "./CommandProvider.service";
import Command from "./entities/Command.entity";
import CannotExecuteCommand from "./exceptions/CannotExecuteCommand.exception";
import CommandInterface from "./interfaces/Command.interface";
import CommandReference from "./interfaces/CommandReference.interface";

@Injectable()
export default class CommandService {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Command )
		private readonly commandRepository: Repository<Command>,
		private readonly commandProviderService: CommandProviderService,
		private readonly relationLoaderService: RelationLoaderService,
	) {
	}

	/**
	 * Creates a Command entity for a commandReference.
	 *
	 * @param {CommandReference} commandReference The reference to create the entity for.
	 * @param {Character} character The character that is affected by the command.
	 *
	 * @return {Command} The command
	 */
	public createEntity( commandReference: CommandReference, character: Character ): Command {
		const command = new Command();
		command.type = commandReference.type;
		command.data = commandReference.data;
		command.undone = false;
		command.character = character;
		return command;
	}

	/**
	 * Executes a command.
	 *
	 * @param {Command} command The command to execute.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async executeCommand( command: Command ) {
		if ( command.executedAt ) {
			throw CannotExecuteCommand.becauseAlreadyExecuted();
		}
		command = await this.relationLoaderService.loadRelations( command, [ "character" ] );

		const commandExecutor: CommandInterface = this.commandProviderService.getCommand( command.type );
		const undoCommandReference = await commandExecutor.execute( command.data, command.character );

		command.undoCommand = this.createEntity( undoCommandReference, command.character );
		command.executedAt = new Date();

		await this.addToHistory( command );
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

		await this.commandRepository.save( command );
	}

	/**
	 * Adds a command to the execution history.
	 *
	 * @param {Command} command The command to add.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async addToHistory( command: Command ): Promise<void> {
		await this.clearRedoList( command.characterId );
		await this.commandRepository.save( command );
	}

	/**
	 * Clears the redo action list.
	 *
	 * @param {number} characterId The id of the character to clear the list for.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async clearRedoList( characterId: number ): Promise<void> {
		await this.commandRepository.delete( { characterId, undone: true } );
	}

	/**
	 * Persists a list of commands.
	 *
	 * @param {LinkedList<Command>} commands The commands to persist.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async persist( commands: LinkedList<Command> ) {
		await this.commandRepository.save( commands.traverse() );
	}

	/**
	 * Gets the full history of executed commands for a character.
	 *
	 * @param {number} characterId The id of the character to get the history for.
	 * @param {boolean} includeUndone Whether to include items that were undone but still can be redone.
	 *
	 * @return {Promise<LinkedList<Command>>} The list of commands.
	 */
	public async getCommandHistory( characterId: number, includeUndone = true ): Promise<LinkedList<Command>> {
		let commands: Command[] = await this.commandRepository.find( {
			where: {
				characterId,
				undoCommand: Not( IsNull() ),
				undone: includeUndone ? In( [ true, false ] ) : false,
			},
			order: { createdAt: "DESC" },
		} );

		commands = await this.relationLoaderService.loadRelations( commands, [ "character", "undoCommand" ] );

		return commands.reduce( ( acc: LinkedList<Command>, command: Command ): LinkedList<Command> => {
			acc.append( command );
			return acc;
		}, new LinkedList<Command>() );
	}
}
