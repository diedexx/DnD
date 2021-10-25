import Skill from "../../skill/entities/Skill.entity";
import Character from "../entities/Character.entity";

export default class NoAbilityScore extends Error {
	/**
	 * Gets the NoAbilityScore when a character doesn't have an ability score for a specific skill.
	 *
	 * @param {Skill} skill The skill that the character doesn't have an ability score for.
	 * @param {Character} character The character that doesn't have teh ability score.
	 *
	 * @return {NoAbilityScore} The exception object.
	 */
	public static forSkill( skill: Skill, character: Character ): NoAbilityScore {
		return new NoAbilityScore( "No " + skill.ability.name + " ability score found for " + character.name );
	}
}
