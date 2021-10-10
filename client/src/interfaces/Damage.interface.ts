import DiceInterface from "./Dice.interface";
import ModifierInterface from "./Modifier.interface";

interface DamageInterface {
	readonly displayValue: string;
	readonly modifier: ModifierInterface;
	readonly type: string;
	readonly dice: DiceInterface;
}

export default DamageInterface;
