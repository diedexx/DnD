import { Field, Int, ObjectType } from "@nestjs/graphql";
import InvalidDice from "../exceptions/InvalidDice.exception";
import InvalidDiceString from "../exceptions/InvalidDiceString.exception";
import Die, { Sides } from "./Die.valueobject";

@ObjectType()
export default class Dice {
	@Field( () => Die )
	public readonly die: Die;

	@Field( () => Int )
	public readonly numberOfDice: number;

	/**
	 * The constructor.
	 *
	 * @param {number} numberOfDice The number of the same dice.
	 * @param {Sides|number} sides The number of sides that the dice has.
	 *
	 * @throws InvalidDice if the number of dice is less than one.
	 */
	constructor( numberOfDice: number, sides: Sides | number ) {
		if ( numberOfDice < 1 ) {
			throw InvalidDice.becauseOfLessThanOnceDie();
		}
		this.numberOfDice = numberOfDice;
		this.die = new Die( sides );
	}

	/**
	 * Gets the human-readable dice representation. Formatted like "2d8".
	 *
	 * @return {string} The human-readable dice representation.
	 */
	@Field()
	get displayValue(): string {
		return this.toString();
	}

	/**
	 * Creates a new Dice object from a string.
	 *
	 * @param {string} diceString The string that contains dice information. formatted like "2d8".
	 *
	 * @return {Dice} The dice object.
	 *
	 * @throws InvalidDiceString When the diceString cannot be parsed.
	 * @throws InvalidDice When the dice object is brought in an invalid state.
	 * @throws InvalidDie When the die object is brought in an invalid state.
	 */
	public static from( diceString: string ): Dice {
		const matches = diceString.match( /(?<numberOfDice>\d+)d(?<sides>\d+)/ );

		if ( ! matches ) {
			InvalidDiceString.becauseOfInvalidFormat( diceString, "2d8" );
		}

		const groups = matches.groups as { numberOfDice: string, sides: string };

		if ( ! groups || ! groups.numberOfDice || ! groups.sides ) {
			InvalidDiceString.becauseOfInvalidFormat( diceString, "2d8" );
		}

		const numberOfDice: number = parseInt( groups.numberOfDice, 10 );
		const sides: number = parseInt( groups.sides, 10 );

		return new Dice( numberOfDice, sides );
	}

	/**
	 * Gets the amount of dice and number of sides of the die in a human readable string.
	 *
	 * @return {string} The amount of dice and number of sides of the die in a human readable string.
	 */
	public toString(): string {
		return this.numberOfDice + this.die.toString();
	}
}

