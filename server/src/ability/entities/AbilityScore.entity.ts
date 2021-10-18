import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Max, Min } from "class-validator";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import BaseEntity from "../../Base.entity";
import Character from "../../character/entities/Character.entity";
import AbilityScoreModifier from "../values/AbilityScoreModifier.value";
import Ability from "./Ability.entity";

@Entity()
@ObjectType()
export default class AbilityScore extends BaseEntity {
	@Column()
	@Field( () => Int )
	@Min( 1 )
	@Max( 30 )
	public score: number;

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
