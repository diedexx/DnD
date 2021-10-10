import DamageInterface from "./Damage.interface";

interface SpellInterface {
	readonly name: string;
	readonly description: string;
	readonly level: number;
	readonly unlockLevel: number;
	readonly damage: DamageInterface;
	readonly prepared: boolean;
}

export default SpellInterface;
