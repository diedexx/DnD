import DamageInterface from "./Damage.interface";
import ModifierInterface from "./Modifier.interface";

interface WeaponInterface {
	readonly name: string;
	readonly description: string;
	readonly attackRollModifier: ModifierInterface;
	readonly equipped: boolean;
	readonly damageRoll: DamageInterface;
}

export default WeaponInterface;
