export default class InvalidExternalModifier extends Error {
	/**
	 * Gets an exception object for the case where an ExternalModifier is situational but doesn't have a description.
	 *
	 * @return {InvalidExternalModifier} The error.
	 */
	static becauseOfMissingDescription(): InvalidExternalModifier {
		return new InvalidExternalModifier( "All situational external modifiers must have a descriptions" );
	}
}
