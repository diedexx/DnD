export interface CharacterDetails {
	readonly id: number;
	readonly name: string;
	readonly race: string;
	readonly background: string;
	readonly alignment: string;
	readonly personalityTraits: string;
	readonly bonds: string;
	readonly flaws: string;
	readonly class: {
		readonly name: string;
	};
	readonly health: {
		readonly currentHealth: number;
		readonly maxHealth: number;
	};
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
