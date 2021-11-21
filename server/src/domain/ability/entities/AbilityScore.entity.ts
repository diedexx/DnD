import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../../infrastructure/Base.entity";
import Character from "../../character/entities/Character.entity";
import AbilityScoreValueTransformer from "../transformers/AbilityScoreValue.transformer";
import AbilityScoreValue from "../values/AbilityScore.value";
import AbilityScoreModifier from "../values/AbilityScoreModifier.value";
import Ability from "./Ability.entity";

@Entity()
@ObjectType()
export default class AbilityScore extends BaseEntity {
	@Field()
	@Column( "int", { transformer: new AbilityScoreValueTransformer() } )
	public score: AbilityScoreValue;

	/**
	 * Gets the abilityScore modifier based on the ability score.
	 *
	 * @return {AbilityScoreModifier} The modifier.
	 */
	@Field()
	get modifier(): AbilityScoreModifier {
		return AbilityScoreModifier.fromAbilityScore( this.score );
	}

	@ManyToOne( () => Character, ( ( character: Character ) => character.abilityScores ) )
	@Field( () => Character )
	public character: Character;

	@Column( "int" )
	@RelationId( ( abilityScore: AbilityScore ) => abilityScore.character )
	@Field( () => Int )
	public readonly characterId: string;

	@ManyToOne( () => Ability, { eager: true, cascade: [ "insert" ] } )
	@Field()
	public ability: Ability;

	@Column( "int" )
	@RelationId( ( abilityScore: AbilityScore ) => abilityScore.ability )
	@Field( () => Int )
	public readonly abilityId: string;
}
