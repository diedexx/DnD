import { Field, Int, ObjectType } from "@nestjs/graphql";
import InvalidDie from "../exceptions/InvalidDie.exception";

export type Sides = 100 | 20 | 12 | 10 | 8 | 6 | 4;
const allowedSides = [ 100, 20, 12, 10, 8, 6, 4 ];

@ObjectType()
export default class Die {
	@Field( () => Int )
	public readonly sides: Sides;

	/**
	 * The constructor.
	 *
	 * @param {Sides|number} sides The number of sides the die has.
	 *
	 * @throws InvalidDie when the number of sides is not supported.
	 */
	public constructor( sides: Sides | number ) {
		this.sides = sides as Sides;
		this.assertSidesIsValid();
	}

	/**
	 * Gets the number of sides of the die in a human readable string.
	 *
	 * @return {Sides} The number of sides of the die in a human readable string.
	 */
	@Field()
	get displayValue(): string {
		return this.toString();
	}

	/**
	 * Gets the number of sides of the die in a human readable string.
	 *
	 * @return {Sides} The number of sides of the die in a human readable string.
	 */
	public toString(): string {
		return "d" + this.sides;
	}

	/**
	 * Validates that the number of sides is supported.
	 *
	 * @return {void}
	 * @throws InvalidDie when the number of sides is not supported.
	 *
	 * @private
	 */
	private assertSidesIsValid(): void {
		if ( ! allowedSides.includes( this.sides ) ) {
			throw InvalidDie.becauseOfInvalidNumberOfSides( this.sides );
		}
	}
}
