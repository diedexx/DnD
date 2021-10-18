import { Field, ObjectType } from "@nestjs/graphql";
import Dice from "../../die/values/Dice.value";
import Modifier from "../../modifier/values/Modifier.value";
import { InvalidDamage } from "../exceptions/InvalidDamage.exception";
import InvalidDamageString from "../exceptions/InvalidDamageString.exception";
import DamageType from "../types/DamageType.type";

@ObjectType()
export class DamageRoll {
	@Field()
	public readonly type: DamageType;

	@Field()
	public readonly modifier: Modifier;

	@Field()
	public readonly dice: Dice;

	/**
	 * The constructor.
	 *
	 * @param {Dice} dice The dice to roll for damage.
	 * @param {Modifier} modifier The modifier to add to the damage roll.
	 * @param {DamageType|string} type The type of the damage.
	 */
	public constructor(
		dice: Dice,
		modifier: Modifier,
		type: DamageType | string,
	) {
		this.dice = dice;
		this.modifier = modifier;
		this.type = type as DamageType;
		this.assertDamageType();
	}

	/**
	 * Creates a new DamageRoll object from a string.
	 *
	 * @param {string} damageString The string that contains DamageRoll information. Formatted like "2d8 +3 Slashing"
	 *
	 * @return {DamageRoll} The DamageRoll object.
	 *
	 * @throws InvalidDamageString When the damageString cannot be parsed.
	 * @throws InvalidDiceString When the diceString cannot be parsed.
	 * @throws InvalidDice When the dice object is brought in an invalid state.
	 * @throws InvalidDie When the die object is brought in an invalid state.
	 */
	public static from( damageString: string ): DamageRoll {
		const [ diceString, modifierString, type ] = damageString.split( " " );
		if ( ! diceString || ! modifierString || ! type ) {
			throw InvalidDamageString.becauseOfUnexpectedFormat( damageString );
		}

		return new DamageRoll(
			Dice.from( diceString ),
			new Modifier( parseInt( modifierString, 10 ) ),
			type as DamageType,
		);
	}

	/**
	 * Gets a human readable string of the damage roll object.
	 *
	 * @return {string} he human readable string. Formatted like "2d8 +3 Slashing"
	 */
	@Field()
	get displayValue(): string {
		return this.toString();
	}

	/**
	 * Transforms a DamageRoll into a human readable string.
	 *
	 * @return {string} The human readable string. Formatted like "2d8 +3 Slashing"
	 */
	public toString(): string {
		return this.dice.toString() + " " + this.modifier.displayBaseValue + " " + this.type;
	}

	/**
	 * Asserts that the damage type is valid.
	 *
	 * @return {void}
	 *
	 * @private
	 */
	private assertDamageType(): void {
		if ( ! Object.values( DamageType ).includes( this.type as DamageType ) ) {
			throw InvalidDamage.becauseInvalidDamageType( this.type );
		}
	}
}
