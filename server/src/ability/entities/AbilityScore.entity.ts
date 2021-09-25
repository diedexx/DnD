import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Character from "../../character/entities/Character.entity";
import AbilityScoreModifierTransformer from "../../character/transformers/AbilityScoreModifier.transformer";
import AbilityScoreModifier from "../models/AbilityScoreModifier.valueobject";
import Ability from "./Ability.entity";

@Entity()
@ObjectType()
export default class AbilityScore extends BaseEntity {
	@Column()
	@Field( () => Int )
	public baseScore: number;

	@Column( { type: "integer", transformer: new AbilityScoreModifierTransformer() } )
	@Field( () => AbilityScoreModifier )
	public modifier: AbilityScoreModifier;

	@ManyToOne( () => Character, ( ( character: Character ) => character.abilityScores ) )
	@Field( () => Character )
	public character: Character;

	@Column( "int" )
	@RelationId( ( abilityScore: AbilityScore ) => abilityScore.character )
	@Field( () => Int )
	public readonly characterId: string;

	@ManyToOne( () => Ability, { eager: true, cascade: [ "insert" ] } )
	@Field( () => Ability )
	public ability: Ability;

	@Column( "int" )
	@RelationId( ( abilityScore: AbilityScore ) => abilityScore.ability )
	@Field( () => Int )
	public readonly abilityId: string;
}
