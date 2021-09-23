import { Field, ObjectType } from "@nestjs/graphql";

export type Sides = 20 | 12 | 10 | 8 | 6 | 4;

@ObjectType()
export default class Die {
	/**
	 * The constructor.
	 *
	 * @param {Sides} _sides The number of sides the die has.
	 */
	public constructor( private readonly _sides: Sides ) {
	}

	/**
	 * Gets the number of sides of the die.
	 *
	 * @return {Sides} The number of sides of the die.
	 */
	@Field()
	get sides(): Sides {
		return this._sides;
	}

	/**
	 * Gets the number of sides of the die in a human readable string.
	 *
	 * @return {Sides} The number of sides of the die in a human readable string.
	 */
	public toString(): string {
		return "d" + this._sides;
	}
}
