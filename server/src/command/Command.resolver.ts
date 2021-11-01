import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Character from "../domain/character/entities/Character.entity";
import CommandService from "./Command.service";
import Command from "./entities/Command.entity";

@Resolver( Command )
export default class CommandResolver {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		private readonly commandService: CommandService,
	) {
	}

	/**
	 * Undoes the last command execution.
	 *
	 * @param {number} characterId The id of the character to undo the last command for.
	 *
	 * @return {Promise<Character>} The character after undoing the action.
	 */
	@Mutation( () => Character )
	public async undoLastCommand(
		@Args( "characterId", { type: () => Int } ) characterId: number,
	): Promise<Character> {
		await this.commandService.undoLastCommand( characterId );
		return await this.characterRepository.findOneOrFail( characterId );
	}
}
