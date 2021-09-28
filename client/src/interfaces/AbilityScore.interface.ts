import ModifierInterface from "./modifier.interface";

interface AbilityScoreInterface {
	readonly baseScore: number;
	readonly modifier: ModifierInterface;
	readonly ability: {
		readonly name: string;
		readonly shortName: string;
		readonly skills: {
			readonly name: string;
		}
	};
}

export default AbilityScoreInterface;
