export interface CharacterSummary {
	readonly id: number;
	readonly name: string;
	readonly race: string;
	readonly class: {
		readonly name: string;
	};
	readonly health: {
		readonly currentHealth: number;
		readonly maxHealth: number;
	};
}