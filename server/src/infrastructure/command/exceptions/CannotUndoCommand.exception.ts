export default class CannotUndoCommandException extends Error {
	/**
	 * Gets an exception for the case where the command cannot be undone because it was never executed.
	 *
	 * @return {CannotUndoCommandException} The exception.
	 */
	public static becauseNotExecuted(): CannotUndoCommandException {
		return new CannotUndoCommandException( "Cannot undo a command because it was never executed in the first place" );
	}
}
