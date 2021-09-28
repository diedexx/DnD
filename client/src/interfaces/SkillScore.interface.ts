import ModifierInterface from "./modifier.interface";

interface SkillScoreInterface {
	readonly abilityShortname: string;
	readonly skillName: string;
	readonly modifier:ModifierInterface;

}

export default SkillScoreInterface;
