import ModifierInterface from "./Modifier.interface";

interface AbilityScoreInterface {
	readonly id: number;
	readonly score: { value: number };
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
