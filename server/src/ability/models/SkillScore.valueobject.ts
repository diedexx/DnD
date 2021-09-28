import { Field, Int, ObjectType } from "@nestjs/graphql";
import AbilityScore from "../entities/AbilityScore.entity";
import Skill from "../entities/Skill.entity";
import AbilityScoreModifier from "./AbilityScoreModifier.valueobject";

@ObjectType()
export default class SkillScore {
	/**
	 * The constructor.
	 *
	 * @param {Skill} skill The skill the skill score is for.
	 * @param {AbilityScore} abilityScore The ability score that is used for the skill.
	 */
	public constructor( private readonly skill: Skill, private readonly abilityScore: AbilityScore ) {
	}

	/**
	 * Gets the name of the skill.
	 *
	 * @return {string} The name of the skill.
	 */
	@Field()
	get skillName(): string {
		return this.skill.name;
	}

	/**
	 * Gets the short name of the ability that is used for the skill.
	 *
	 * @return {string} The short name of the ability that is used for the skill.
	 */
	@Field()
	get abilityShortname(): string {
		return this.skill.ability.shortName;
	}

	/**
	 * Gets the base score of the ability that is used for the skill.
	 *
	 * @return {number} The base score of the ability that is used for the skill.
	 */
	@Field( () => Int )
	get baseScore(): number {
		return this.abilityScore.baseScore;
	}

	/**
	 * Gets the modifier of the ability that is used for the skill.
	 *
	 * @return {AbilityScoreModifier} The modifier of the ability that is used for the skill.
	 */
	@Field( () => AbilityScoreModifier )
	get modifier(): AbilityScoreModifier {
		return this.abilityScore.modifier;
	}
}
