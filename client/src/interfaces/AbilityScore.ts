interface AbilityScore {
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
	};
}

export default AbilityScore;
