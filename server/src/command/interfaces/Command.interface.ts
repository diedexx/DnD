import Character from "../../domain/character/entities/Character.entity";
import CommandReference from "./CommandReference.interface";

interface CommandInterface<T extends Record<string, any> = Record<string, any>> {
	/**
	 * Gets the type of the command.
	 *
	 * @return {string} The type of the command.
	 */
	getType(): string;

	/**
	 * Gets a display-friendly name.
	 *
	 * @param {T} data The data that the command is executed with.
	 * @param {Character} character The character the command is executed for.
	 *
	 * @return {Promise<string>} The name of the command.
	 */
	getName( data: T, character: Character ): Promise<string>;

	/**
	 * Gets a description of the command.
	 *
	 * @param {T} data The data that the command is executed with.
	 * @param {Character} character The character the command is executed for.
	 *
	 * @return {Promise<string>} The description.
	 */
	getDescription( data: T, character: Character ): Promise<string>;

	/**
	 * Whether the command supports a certain type.
	 * @param {string} type The type to check support for.
	 * @return {boolean} Whether the command supports the given type.
	 */
	supports( type: string ): boolean;

	/**
	 * Executes the command.
	 *
	 * @param {T} data The data that the command is executed with.
	 * @param {Character} character The character the command is executed for.
	 *
	 * @return {Promise<CommandReference>} A reference to a command which undoes the changes this command has made.
	 */
	execute( data: T, character: Character ): Promise<CommandReference>;
}

export default CommandInterface;
