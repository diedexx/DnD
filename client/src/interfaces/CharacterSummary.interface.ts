import HealthInterface from "./Health.interface";

interface CharacterSummaryInterface {
	readonly id: number;
	readonly name: string;
	readonly level: number;
	readonly experience: number;
	readonly race: string;
	readonly health: HealthInterface;
	readonly class: {
		readonly name: string;
	};
}

export default CharacterSummaryInterface;
