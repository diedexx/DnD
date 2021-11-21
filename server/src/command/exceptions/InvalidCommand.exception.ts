export default class InvalidCommand extends Error {
	/**
	 * Gets an exception for the case where a command is invalid because its given data is invalid.
	 *
	 * @param {Record<string, any>} data The data that is invalid.
	 *
	 * @return {InvalidCommand} The exception.
	 */
	public static becauseOfInvalidData( data: Record<string, any> ): InvalidCommand {
		return new InvalidCommand( "Command data is invalid. Received: " + JSON.stringify( data ) );
	}

	/**
	 * Gets an exception for the case where a command was expected to be executed, but wasn't.
	 *
	 * @return {InvalidCommand} The exception.
	 */
	public static becauseNotExecuted(): InvalidCommand {
		return new InvalidCommand( "Command wasn't previously executed" );
	}
}
