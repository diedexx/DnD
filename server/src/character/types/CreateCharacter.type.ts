import { CharacterAlignment, CharacterBackground, CharacterRace } from "../entities/Character.entity";

export type AbilityScoreType = {
	abilityId: number;
	modifier: number;
	baseScore: number;
}

type CreateCharacterType = {
	name: string;
	classId: number;
	race: CharacterRace;
	maxHealth: number;
	alignment: CharacterAlignment;
	bonds: string;
	background: CharacterBackground;
	flaws: string;
	ideals: string;
	abilityScores: AbilityScoreType[];
}

export default CreateCharacterType;
