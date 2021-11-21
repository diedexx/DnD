export default class CannotRedoCommandException extends Error {
	/**
	 * Gets an exception for the case where the command cannot be redone because it was never undone.
	 *
	 * @return {CannotUndoCommandException} The exception.
	 */
	public static becauseNotUndone(): CannotRedoCommandException {
		return new CannotRedoCommandException( "Cannot redo a command because it was never undone" );
	}
}
