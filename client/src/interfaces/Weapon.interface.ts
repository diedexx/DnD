import ModifierInterface from "./Modifier.interface";

interface WeaponInterface {
	readonly name: string;
	readonly description: string;
	readonly attackRollModifier: ModifierInterface;
	readonly damageRoll: {
		readonly displayValue: string;
		readonly modifier: ModifierInterface;
		readonly type: string;
		readonly dice: {
			readonly displayValue;
		}
	};
}

export default WeaponInterface;
