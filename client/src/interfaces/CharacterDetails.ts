import AbilityScore from "./AbilityScore";
import CharacterSummary from "./CharacterSummary";

interface CharacterDetails extends CharacterSummary {
	readonly background: string;
	readonly alignment: string;
	readonly personalityTraits: string;
	readonly bonds: string;
	readonly flaws: string;
	readonly abilityScores: AbilityScore[];
}

export default CharacterDetails;
