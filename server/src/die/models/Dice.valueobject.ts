import InvalidNumberOfDice from "../exceptions/InvalidNumberOfDice.exception";
import Die, { Sides } from "./Die.valueobject";

export default class Dice {
	private readonly die: Die;

	/**
	 * The constructor.
	 *
	 * @param {number} numberOfDice The number of the same dice.
	 * @param {Sides} sides The number of sides that the dice has.
	 *
	 * @throws InvalidNumberOfDice if the number of dice is less than one.
	 */
	constructor( private readonly numberOfDice: number, sides: Sides ) {
		if ( numberOfDice < 1 ) {
			throw InvalidNumberOfDice.lessThanOnceDie();
		}
		this.die = new Die( sides );
	}

	/**
	 * Gets the amount of dice and number of sides of the die in a human readable string.
	 *
	 * @return {Sides} The amount of dice and number of sides of the die in a human readable string.
	 */
	public toString(): string {
		return this.numberOfDice + this.die.toString();
	}
}

