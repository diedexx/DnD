import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, IsNull, Not, Repository } from "typeorm";
import RelationLoaderService from "../database/RelationLoader.service";
import LinkedList from "../structures/linkedList/LinkedList";
import Command from "./entities/Command.entity";

@Injectable()
export default class CommandHistoryService {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Command )
		private readonly commandRepository: Repository<Command>,
		private readonly relationLoaderService: RelationLoaderService,
	) {
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
				undoCommandId: Not( IsNull() ),
				executedAt: Not( IsNull() ),
				undone: includeUndone ? In( [ true, false ] ) : false,
			},
			order: { executedAt: "ASC" },
		} );

		commands = await this.relationLoaderService.loadRelations( commands, [ "character", "undoCommand" ] );

		return LinkedList.fromArray( commands );
	}

	/**
	 * Adds a command to the execution history.
	 *
	 * @param {Command} command The command to add.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	public async addToHistory( command: Command ): Promise<void> {
		await this.clearRedoList( command.character.id );
		await this.commandRepository.save( command );
	}

	/**
	 * Updates a link in the command chain history.
	 *
	 * @param {Command} command The command in the history to update.
	 *
	 * @return {Promise<Command>} The updated command.
	 */
	public async updateInHistory( command: Command ): Promise<Command> {
		return this.commandRepository.save( command );
	}

	/**
	 * Clears the redo action list.
	 *
	 * @param {number} characterId The id of the character to clear the list for.
	 *
	 * @return {Promise<void>} Nothing.
	 */
	private async clearRedoList( characterId: number ): Promise<void> {
		const undoneCommands = await this.commandRepository.find( { characterId, undone: true } );
		if ( ! undoneCommands.length ) {
			return;
		}
		const ids = undoneCommands.flatMap( ( undoneCommand: Command ) => [ undoneCommand.id, undoneCommand.undoCommandId ] );

		await this.commandRepository.delete( ids );
	}
}
