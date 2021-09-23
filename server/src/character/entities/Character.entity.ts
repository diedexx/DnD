import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";
import AbilityScore from "../../abilities/entities/AbilityScore.entity";
import Skill from "../../abilities/entities/Skill.entity";
import SkillScore from "../../abilities/models/SkillScore";
import BaseEntity from "../../Base.entity";
import NoAbilityScore from "../exceptions/NoAbilityScore";
import Health from "../models/Health.entity";
import HealthTransformer from "../transformers/Health.transformer";
import CharacterClass from "./CharacterClass.entity";

// https://www.dndbeyond.com/races
export type CharacterRace = string;

// https://www.dndbeyond.com/backgrounds
export type CharacterBackground = string;

// https://www.dndbeyond.com/sources/basic-rules/personality-and-background#Alignment
export type CharacterAlignment = string;

@Entity()
@ObjectType()
export default class Character extends BaseEntity {
	@Column()
	@Field()
	public name: string;

	@Column()
	@Field()
	public race: CharacterRace;

	@Column()
	@Field()
	public background: CharacterBackground;

	@Column()
	@Field()
	public alignment: CharacterAlignment;

	@Column( {
		type: "varchar",
		length: 50,
		transformer: new HealthTransformer(),
		comment: "The current and total health formatted like current/total (9/10)",
	} )
	@Field( () => Health )
	public health: Health;

	@Column( "text" )
	@Field()
	public personalityTraits: string;

	@Column( "text" )
	@Field()
	public ideals: string;

	@Column( "text" )
	public bonds: string;

	@Column( "text" )
	@Field()
	public flaws: string;

	@ManyToOne( () => CharacterClass, { nullable: false } )
	@Field( () => CharacterClass )
	public class: CharacterClass;

	@Column( "int" )
	@RelationId( ( character: Character ) => character.class )
	public readonly classId: string;

	@OneToMany( () => AbilityScore, ( ( abilityScore: AbilityScore ) => abilityScore.character ), { cascade: [ "insert" ] } )
	public abilityScores: AbilityScore[];

	/**
	 * Gets a skill score object for a skill.
	 *
	 * @param {Skill} skill The skill.
	 *
	 * @return {SkillScore} The skillScore object.
	 *
	 * @throws NoAbilityScore The character doesn't have an ability score for the ability related to the requested skill.
	 */
	public getSkillScore( skill: Skill ): SkillScore {
		const abilityScoreForSkill: AbilityScore = this.abilityScores.find(
			( abilityScore: AbilityScore ) => abilityScore.ability.isSameEntity( skill.ability ),
		);
		if ( ! abilityScoreForSkill ) {
			throw NoAbilityScore.forSkill( skill, this );
		}
		return new SkillScore( skill, abilityScoreForSkill );
	}
}
