import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbilityScore from "../../abilities/entities/AbilityScore.entity";
import Skill from "../../abilities/entities/Skill.entity";
import SkillScore from "../../abilities/models/SkillScore";
import BaseEntity from "../../entities/Base.entity";
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
export default class Character extends BaseEntity {
	@Column()
	public name: string;

	@Column()
	public race: CharacterRace;

	@Column()
	public background: CharacterBackground;

	@Column()
	public alignment: CharacterAlignment;

	@Column( {
		type: "varchar",
		transformer: new HealthTransformer(),
		comment: "The current and total health formatted like current/total (9/10)",
	} )
	public health: Health;

	@Column( { type: "text" } )
	public personalityTraits: string;

	@Column( { type: "text" } )
	public ideals: string;

	@Column( { type: "text" } )
	public bonds: string;

	@Column( { type: "text" } )
	public flaws: string;

	@ManyToOne( () => CharacterClass, { nullable: false } )
	public class: CharacterClass;

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
