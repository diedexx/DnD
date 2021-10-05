import { Field, Int, ObjectType } from "@nestjs/graphql";
import { castArray } from "lodash";
import ExternalModifier from "./ExternalModifier.valueobject";

@ObjectType()
export default class Modifier {
	@Field( () => Int )
	public readonly base: number;

	@Field( () => [ ExternalModifier ] )
	public readonly externalModifiers: ExternalModifier[];

	/**
	 * The constructor.
	 *
	 * @param {number} base The modifier value.
	 * @param {ExternalModifier[]} externalModifiers The external modifiers.
	 */
	public constructor( base: number, externalModifiers: ExternalModifier[] = [] ) {
		this.base = base;
		this.externalModifiers = externalModifiers.sort( ( a: ExternalModifier, b: ExternalModifier ): number => {
			if ( a.situational !== b.situational ) {
				return a.situational ? 1 : -1;
			}
			return b.modifier.value - a.modifier.value;
		} );
	}

	/**
	 * Gets the Modifier value with external modifiers without situational modifiers.
	 *
	 * @return {number} The Modifier value.
	 */
	@Field( () => Int )
	get value(): number {
		return this.externalModifiers.reduce( ( acc: number, externalModifier: ExternalModifier ) => {
			if ( externalModifier.situational ) {
				return acc;
			}
			return acc + externalModifier.modifier.value;
		}, this.base );
	}

	/**
	 * Gets the Modifier value with external modifiers including situational modifiers.
	 *
	 * @return {number} The Modifier value.
	 */
	@Field( () => Int )
	get situationalValue(): number {
		return this.externalModifiers.reduce( ( acc: number, externalModifier: ExternalModifier ) => {
			return acc + externalModifier.modifier.value;
		}, this.base );
	}

	/**
	 * Gets the display friendly value for a modifier without situational modifiers.
	 *
	 * @return {string} The display friendly value for a modifier.
	 */
	@Field()
	get displayValue(): string {
		return Modifier.getDisplayValue( this.value );
	}

	/**
	 * Gets the display friendly value for a modifier with situational modifiers.
	 *
	 * @return {string} The display friendly value for a modifier.
	 */
	@Field()
	get displaySituationalValue(): string {
		return Modifier.getDisplayValue( this.situationalValue );
	}

	/**
	 * Gets the display friendly value for an base modifier.
	 *
	 * @return {string} The display friendly value for a modifier.
	 */
	@Field()
	get displayBaseValue(): string {
		return Modifier.getDisplayValue( this.base );
	}

	/**
	 * Gets the Modifier value in a human readable string.
	 *
	 * @return {string} The Modifier value in a human readable string.
	 */
	public toString(): string {
		return Modifier.getDisplayValue( this.value );
	}

	/**
	 * Gets a human readable value for a numeric modifier.
	 *
	 * @param {number} value The numeric modifier value.
	 *
	 * @return {string} The human readable modifier value.
	 *
	 * @private
	 */
	private static getDisplayValue( value: number ): string {
		if ( value >= 0 ) {
			return "+" + value;
		}
		return value.toString();
	}

	/**
	 * Creates a new Modifier with an added external modifier.
	 *
	 * @param {ExternalModifier[]} externalModifier The external modifiers to add.
	 *
	 * @return {Modifier} The new modifier.
	 */
	public withExternalModifier( ...externalModifier: ExternalModifier[] ): Modifier {
		return new Modifier( this.base, this.externalModifiers.concat( ...castArray( externalModifier ) ) );
	}
}

