export default class CannotExecuteCommand extends Error {
	/**
	 * Gets an exception for the case where a command cannot be executed because it has been executed before.
	 *
	 * @return {CannotExecuteCommand} The exception.
	 */
	public static becauseAlreadyExecuted() {
		return new CannotExecuteCommand( "Cannot execute the same command twice" );
	}
}
