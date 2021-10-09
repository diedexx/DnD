import DiceInterface from "./Dice.interface";
import ModifierInterface from "./Modifier.interface";

interface WeaponInterface {
	readonly name: string;
	readonly description: string;
	readonly attackRollModifier: ModifierInterface;
	readonly equipped: boolean;
	readonly damageRoll: {
		readonly displayValue: string;
		readonly modifier: ModifierInterface;
		readonly type: string;
		readonly dice: DiceInterface;
	};
}

export default WeaponInterface;
