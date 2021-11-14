import { Injectable, OnModuleInit } from "@nestjs/common";
import Character from "../../domain/character/entities/Character.entity";
import CommandProviderService from "../CommandProvider.service";
import InvalidCommand from "../exceptions/InvalidCommand.exception";
import CommandInterface from "../interfaces/Command.interface";
import CommandReference from "../interfaces/CommandReference.interface";

/**
 * @template T
 */
@Injectable()
export abstract class AbstractCommand<T extends Record<string, any> = Record<string, any>> implements CommandInterface<T>, OnModuleInit {
	/**
	 * The constructor.
	 */
	public constructor( private readonly commandProviderService: CommandProviderService ) {
	}

	/**
	 * @inheritDoc
	 */
	public abstract getType(): string;

	/**
	 * @inheritDoc
	 */
	public abstract getName( data: T, character: Character ): Promise<string>;

	/**
	 * @inheritDoc
	 */
	public abstract getDescription( data: T, character: Character ): Promise<string>;

	/**
	 * @inheritDoc
	 */
	public supports( type: string ): boolean {
		return this.getType().toLowerCase() === type.toLowerCase();
	}

	/**
	 * @inheritDoc
	 */
	public async execute( data: T, character: Character ): Promise<CommandReference> {
		if ( ! this.validateData( data, character ) ) {
			throw InvalidCommand.becauseOfInvalidData( data );
		}
		return this.perform( data, character );
	}

	/**
	 * Performs the command action.
	 *
	 * @param {T} data The data that the command is executed with.
	 * @param {Character} character The character the command is executed for.
	 *
	 * @return {Promise<CommandReference>} A reference to a command which undoes the changes this command has made.
	 *
	 * @protected
	 */
	protected abstract perform( data: T, character: Character ): Promise<CommandReference>;

	/**
	 * Checks the data object for validity.
	 *
	 * @param {T} data The data that the command is executed with.
	 * @param {Character} character The character the command is executed for.
	 *
	 * @return {boolean} Whether the data object is valid.
	 *
	 * @protected
	 */
	protected abstract validateData( data: T, character: Character ): boolean;

	/**
	 * Registers the command on module init.
	 *
	 * @return {void}
	 */
	public onModuleInit(): void {
		this.commandProviderService.registerCommand( this );
	}
}
