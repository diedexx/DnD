import { Field, ObjectType } from "@nestjs/graphql";
import Command from "../entities/Command.entity";
import InvalidExecutedCommand from "../exceptions/InvalidExecutedCommand.exception";

@ObjectType()
export class ExecutedCommand {
	public readonly command: Command;

	@Field()
	public readonly name: string;

	@Field()
	public readonly description: string;

	/**
	 * The constructor.
	 *
	 * @param {Command} command The command that was executed.
	 * @param {string} name The name of the command.
	 * @param {string} description A description describing the executed command.
	 */
	public constructor( command: Command, name: string, description: string ) {
		this.command = command;
		this.name = name;
		this.description = description;
		if ( ! command.executedAt ) {
			throw new InvalidExecutedCommand( name );
		}
	}

	/**
	 * Whether the command was undone.
	 *
	 * @return {boolean} Whether the command was undone.
	 */
	@Field()
	public get isUndone(): boolean {
		return this.command.undone;
	}

	/**
	 * Gets the date on which the command was first executed.
	 *
	 * @return {Date} The date on which the command was first executed.
	 */
	@Field()
	public get executedAt(): Date {
		return this.command.executedAt;
	}
}
