import AbilityScoreInterface from "./AbilityScore.interface";
import CharacterSummaryInterface from "./CharacterSummary.interface";
import SkillScore from "./SkillScore.interface";

interface CharacterDetailsInterface extends CharacterSummaryInterface {
	readonly background: string;
	readonly alignment: string;
	readonly personalityTraits: string;
	readonly bonds: string;
	readonly flaws: string;
	readonly abilityScores: AbilityScoreInterface[];
	readonly skillScores: SkillScore[]
;}

export default CharacterDetailsInterface;
