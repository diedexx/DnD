import ExternalModifierInterface from "./ExternalModifier.interface";

interface EquipmentInterface {
	readonly name: string;
	readonly description: string;
	readonly equippable: boolean;
	readonly equipped: boolean;
	readonly number: number;
	readonly bonuses: ExternalModifierInterface[];
}

export default EquipmentInterface;
