import ModifierInterface from "./Modifier.interface";
import SkillInterface from "./Skill.interface";


interface SkillScoreInterface {
	readonly isProficient: boolean;
	readonly modifier: ModifierInterface;
	readonly skill: SkillInterface;
}

export default SkillScoreInterface;
