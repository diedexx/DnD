import { Field, ObjectType } from "@nestjs/graphql";
import InvalidAbilityScoreValue from "../../spell/exceptions/InvalidAbilityScoreValue.exception";

@ObjectType()
export default class AbilityScoreValue {
	@Field()
	public readonly value: number;

	/**
	 * The constructor.
	 *
	 * @param {number} value The AbilityScore value.
	 *
	 * @throws InvalidAbilityScoreValue If the given value is invalid.
	 */
	public constructor( value: number ) {
		this.value = value;
		this.assertAbilityScoreValid();
	}

	/**
	 * Checks if the value is within the allowed range.
	 *
	 * @private
	 *
	 * @throws InvalidAbilityScoreValue If the given value is invalid.
	 *
	 * @return {void}
	 */
	private assertAbilityScoreValid(): void {
		if ( this.value > 30 ) {
			throw InvalidAbilityScoreValue.becauseValueTooHigh( this.value );
		}
		if ( this.value < 1 ) {
			throw InvalidAbilityScoreValue.becauseValueTooLow( this.value );
		}
	}
}

