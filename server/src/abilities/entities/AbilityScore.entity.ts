import { Column, Entity, ManyToOne } from "typeorm";
import Character from "../../character/entities/Character.entity";
import AbilityScoreModifierTransformer from "../../character/transformers/AbilityScoreModifier.transformer";
import BaseEntity from "../../entities/Base.entity";
import AbilityScoreModifier from "../models/AbilityScoreModifier";
import Ability from "./Ability.entity";

@Entity()
export default class AbilityScore extends BaseEntity {
	@Column()
	public baseScore: number;

	@Column( { type: "integer", transformer: new AbilityScoreModifierTransformer() } )
	public modifier: AbilityScoreModifier;

	@ManyToOne( () => Character, ( ( character: Character ) => character.abilityScores ) )
	public character: Character;

	@ManyToOne( () => Ability )
	public ability: Ability;
}
