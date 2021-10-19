import { Field, ObjectType } from "@nestjs/graphql";
import InvalidExternalModifier from "../exceptions/InvalidExternalModifier.exception";
import ModificationTypes from "../types/ModificationTypes.type";
import Modifier from "./Modifier.value";

@ObjectType()
export default class ExternalModifier {
	@Field()
	public readonly source: string;

	@Field()
	public readonly type: ModificationTypes;

	@Field( () => Modifier )
	public readonly modifier: Modifier;

	@Field()
	public readonly situational: boolean;

	@Field( { nullable: true } )
	public readonly description?: string;

	/**
	 * The constructor.
	 *
	 * @param {string} source The source of the modifier.
	 * @param {ModificationTypes} type The type of the modifiable.
	 * @param {Modifier} modifier The modifier.
	 * @param {boolean} situational If the modifier should be applied situational.
	 * @param {string} description The description of the modifier, required for situational modifiers.
	 */
	public constructor(
		source: string,
		type: ModificationTypes,
		modifier: Modifier,
		situational: boolean,
		description?: string,
	) {
		this.source = source;
		this.type = type;
		this.modifier = modifier;
		this.situational = situational;
		this.description = description;

		this.assertHasSituationalDescription();
	}

	/**
	 * Checks that a situational ExternalModifier has a description to clarify to which situations it applies.
	 *
	 * @return {void}
	 *
	 * @private
	 */
	private assertHasSituationalDescription(): void {
		if ( this.situational && ! this.description ) {
			throw InvalidExternalModifier.becauseOfMissingDescription();
		}
	}
}
