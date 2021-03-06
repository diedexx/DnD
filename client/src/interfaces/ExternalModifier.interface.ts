import ModifierInterface from "./Modifier.interface";

interface ExternalModifierInterface {
	readonly source: string;
	readonly type: string;
	readonly modifier: ModifierInterface;
	readonly situational: boolean;
	readonly description: boolean;
}

export default ExternalModifierInterface;
