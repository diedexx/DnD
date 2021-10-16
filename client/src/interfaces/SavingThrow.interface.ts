import ModifierInterface from "./Modifier.interface";

interface SavingThrowInterface {
	readonly isProficient: boolean;
	readonly modifier: ModifierInterface;
	readonly ability: {
		readonly name: string
		readonly shortName: string;
	};
}

export default SavingThrowInterface;
