import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export default class AbilityScoreModifier {
	/**
	 * The constructor.
	 *
	 * @param {number} modifier The ability score modifier value.
	 */
	public constructor( private readonly modifier: number ) {
	}

	/**
	 * Gets the AbilityScoreModifier value.
	 *
	 * @return {number} The AbilityScoreModifier value.
	 */
	@Field( () => Int )
	get value(): number {
		return this.modifier;
	}

	/**
	 * Gets the display friendly value for an ability score modifier.
	 *
	 * @return {string} The display friendly value for an ability score modifier.
	 */
	@Field( { name: "displayValue" } )
	get displayValue(): string {
		return this.toString();
	}

	/**
	 * Gets the AbilityScoreModifier value in a human readable string.
	 *
	 * @return {string} The AbilityScoreModifier value in a human readable string.
	 */
	public toString(): string {
		if ( this.modifier >= 0 ) {
			return "+" + this.modifier;
		}
		return this.modifier.toString();
	}
}

