export default class CannotCalculatePreparationLimit extends Error {
	/**
	 * Gets an exception for the case where preparation-limits are being calculated for a class that has no rules configured.
	 *
	 * @param {string} className The unknown classname.
	 *
	 * @return {CannotCalculatePreparationLimit} The exception.
	 */
	public static becauseNoClassRules( className: string ): CannotCalculatePreparationLimit {
		return new CannotCalculatePreparationLimit( "Can't calculate the spell preparation limit. No class rules are configured for " + className );
	}

	/**
	 * Gets an exception for the case where preparation-limits are being calculated for a class without limits.
	 *
	 *  @param {string} className The classname.
	 *
	 * @return {CannotCalculatePreparationLimit} The exception.
	 */
	public static becauseUnlimited( className: string ): CannotCalculatePreparationLimit {
		return new CannotCalculatePreparationLimit( "The " + className + " class has unlimited prepared slots" );
	}
}
