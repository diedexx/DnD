import { Field, Int, ObjectType } from "@nestjs/graphql";
import { castArray } from "lodash";
import ExternalModifier from "./ExternalModifier.valueobject";

@ObjectType()
export default class Modifier {
	@Field( () => Int )
	public readonly base: number;

	private readonly _externalModifiers: ExternalModifier[];

	/**
	 * The constructor.
	 *
	 * @param {number} base The modifier value.
	 */
	public constructor( base: number ) {
		this.base = base;
		this._externalModifiers = [];
	}

	/**
	 * Gets the Modifier value with external modifiers.
	 *
	 * @return {number} The Modifier value.
	 */
	@Field( () => Int )
	get value(): number {
		return this._externalModifiers.reduce( ( acc: number, externalModifier: ExternalModifier ) => {
			if ( externalModifier.situational ) {
				return;
			}
			return acc + externalModifier.modifier.value;
		}, this.base );
	}

	/**
	 * Gets the display friendly value for an ability score modifier.
	 *
	 * @return {string} The display friendly value for an ability score modifier.
	 */
	@Field()
	get displayValue(): string {
		return this.toString();
	}

	/**
	 * Gets the Modifier value in a human readable string.
	 *
	 * @return {string} The Modifier value in a human readable string.
	 */
	public toString(): string {
		if ( this.value >= 0 ) {
			return "+" + this.value;
		}
		return this.value.toString();
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
		this._externalModifiers.push( ...castArray( externalModifier ) );
	}

	/**
	 * Gets a list of applied external modifiers.
	 *
	 * @return {ExternalModifier[]} The list of applied externalModifiers.
	 */
	@Field( () => [ ExternalModifier ] )
	get externalModifiers(): ExternalModifier[] {
		return this._externalModifiers;
	}
}

