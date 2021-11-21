import { Inject, Injectable } from "@nestjs/common";
import CommandInterface from "./interfaces/Command.interface";

@Injectable()
export default class CommandProviderService {
	private readonly commands: CommandInterface[];

	/**
	 * The constructor.
	 */
	public constructor(
		@Inject( "FallbackCommand" )
		private readonly fallbackCommand: CommandInterface,
	) {
		this.commands = [];
	}

	/**
	 * Registers a command.
	 *
	 * @param {CommandInterface} command The command to register.
	 *
	 * @return {void}
	 */
	public registerCommand( command: CommandInterface ): void {
		this.commands.push( command );
	}

	/**
	 * Gets a command instance for a given type of command.
	 *
	 * @param {string} type The type of command to get an instance for.
	 *
	 * @return {CommandInterface} The command instance.
	 */
	public getCommand( type: string ): CommandInterface {
		for ( const command of this.commands ) {
			if ( command.supports( type ) ) {
				return command;
			}
		}

		return this.fallbackCommand;
	}
}
