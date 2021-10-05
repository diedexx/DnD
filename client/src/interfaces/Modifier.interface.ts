import ExternalModifierInterface from "./ExternalModifier.interface";

interface ModifierInterface {
	readonly value: number;
	readonly base: number;
	readonly situationalValue: number;
	readonly displayValue: string;
	readonly displayBaseValue: string;
	readonly displaySituationalValue: string;
	readonly externalModifiers?: ExternalModifierInterface[]
}

export default ModifierInterface;
