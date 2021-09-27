import { CharacterSummary } from "./CharacterSummary";

export interface CharacterDetails extends CharacterSummary {
	readonly background: string;
	readonly alignment: string;
	readonly personalityTraits: string;
	readonly bonds: string;
	readonly flaws: string;
	readonly abilityScores: {
		readonly baseScore: number;
		readonly modifier: {
			readonly value: number
		};
		readonly ability: {
			readonly name: string;
			readonly shortName: string;
			readonly skills: {
				readonly name: string;
			}
		}
	};
}
