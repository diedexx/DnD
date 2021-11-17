export default class InvalidExecutedCommand extends Error {
	/**
	 * Gets an exception for the case where the executedCommand data is invalid because the command was never executed.
	 *
	 * @param {string} name The name of the command
	 *
	 * @return {InvalidCommand} The exception.
	 */
	public static becauseNotExecuted( name: string ): InvalidExecutedCommand {
		return new InvalidExecutedCommand( "Unexpected value. Command was never executed. Name: " + name );
	}
}
