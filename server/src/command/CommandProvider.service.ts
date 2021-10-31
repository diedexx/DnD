import { Inject, Injectable } from "@nestjs/common";
import { NoopCommand } from "./commands/NoopCommand";
import CommandInterface from "./interfaces/Command.interface";

@Injectable()
export default class CommandProviderService {
	/**
	 * The constructor.
	 */
	public constructor(
		@Inject( "COMMANDS" )
		private readonly commands: CommandInterface[],
		private readonly noopCommand: NoopCommand,
	) {
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

		return this.noopCommand;
	}
}
