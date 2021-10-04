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
	 */
	public constructor( base: number ) {
		this.base = base;
		this.externalModifiers = [];
	}

	/**
	 * Gets the Modifier value with external modifiers.
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
	 * Gets the display friendly value for an modifier.
	 *
	 * @return {string} The display friendly value for a modifier.
	 */
	@Field()
	get displayValue(): string {
		return Modifier.getDisplayValue( this.value );
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

	// eslint-disable-next-line no-warning-comments
	/**
	 * Adds a list of externalModifiers.
	 *
	 * todo This is not a proper valueObject because of these mutations. May fix later.
	 *
	 * @param {ExternalModifier[]} externalModifier The external modifiers to add.
	 *
	 * @return {void}
	 */
	public addExternalModifier( ...externalModifier: ExternalModifier[] ): void {
		this.externalModifiers.push( ...castArray( externalModifier ) );
	}
}

