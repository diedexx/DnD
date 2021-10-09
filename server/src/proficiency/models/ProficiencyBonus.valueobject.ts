import { ObjectType } from "@nestjs/graphql";
import Modifier from "../../modifier/models/Modifier.valueobject";
import InvalidProficiency from "../exceptions/InvalidProficiency.exception";

@ObjectType()
export default class ProficiencyBonus extends Modifier {
	/**
	 * The constructor.
	 *
	 * @param {number} bonus The height of the proficiency bonus.
	 */
	public constructor( bonus: number ) {
		super( bonus );
		this.assertValidValue();
	}

	/**
	 * Constructs the proficiency object based on a character level.
	 *
	 * @param {number} level The character level.
	 *
	 * @return {ProficiencyBonus} The proficiency object based on character level.
	 */
	public static forLevel( level: number ): ProficiencyBonus {
		const increasesAtLevel = [ 5, 9, 13, 17 ];

		const bonus = increasesAtLevel.reduce( ( acc: number, bumpLevel: number ) => {
			if ( level >= bumpLevel ) {
				acc++;
			}
			return acc;
		}, 2 );

		return new ProficiencyBonus( bonus );
	}

	/**
	 * Checks if the object is in a valid state.
	 *
	 * @return {void}
	 *
	 * @private
	 */
	private assertValidValue(): void {
		if ( this.value < 2 || this.value > 6 ) {
			throw InvalidProficiency.becauseOfInvalidBonusValue( this.value );
		}
	}
}

