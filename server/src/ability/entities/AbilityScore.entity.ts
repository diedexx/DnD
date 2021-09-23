import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import Character from "../../character/entities/Character.entity";
import AbilityScoreModifierTransformer from "../../character/transformers/AbilityScoreModifier.transformer";
import BaseEntity from "../../Base.entity";
import AbilityScoreModifier from "../models/AbilityScoreModifier.valueobject";
import Ability from "./Ability.entity";

@Entity()
export default class AbilityScore extends BaseEntity {
	@Column()
	public baseScore: number;

	@Column( { type: "integer", transformer: new AbilityScoreModifierTransformer() } )
	public modifier: AbilityScoreModifier;

	@ManyToOne( () => Character, ( ( character: Character ) => character.abilityScores ) )
	public character: Character;

	@Column( "int" )
	@RelationId( ( abilityScore: AbilityScore ) => abilityScore.character )
	public readonly characterId: string;

	@ManyToOne( () => Ability, { eager: true, cascade: [ "insert" ] } )
	public ability: Ability;

	@Column( "int" )
	@RelationId( ( abilityScore: AbilityScore ) => abilityScore.ability )
	public readonly abilityId: string;
}
