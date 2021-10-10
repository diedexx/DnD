import Character from "../../character/entities/Character.entity";

interface PreparationLimiterInterface {
	/**
	 * Gets the number of spells a character can prepare.
	 *
	 * @param {Character} character The character to get the limit for.
	 *
	 * @return {Promise<number>} The number of spells the character can prepare.
	 */
	getPreparationLimit( character: Character ): Promise<number>;

	/**
	 * Checks whether the character is supported by this preparation limiter.
	 *
	 *  @param {Character} character The character.
	 *
	 * @return {Promise<boolean>} If the character is supported.
	 */
	supports( character: Character ): Promise<boolean>;
}

export default PreparationLimiterInterface;
