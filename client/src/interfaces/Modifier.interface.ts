import ExternalModifierInterface from "./ExternalModifier.interface";

interface ModifierInterface {
	readonly value: number;
	readonly displayValue: string;
	readonly externalModifiers?: ExternalModifierInterface[]
}

export default ModifierInterface;
