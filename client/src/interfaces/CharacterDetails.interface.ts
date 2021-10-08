import AbilityScoreInterface from "./AbilityScore.interface";
import CharacterSummaryInterface from "./CharacterSummary.interface";
import SkillScore from "./SkillScore.interface";
import WalletInterface from "./Wallet.interface";
import WeaponInterface from "./Weapon.interface";

interface CharacterDetailsInterface extends CharacterSummaryInterface {
	readonly background: string;
	readonly alignment: string;
	readonly personalityTraits: string;
	readonly ideals: string;
	readonly bonds: string;
	readonly flaws: string;
	readonly abilityScores: AbilityScoreInterface[];
	readonly skillScores: SkillScore[];
	readonly weapons: WeaponInterface[];
	readonly wallet: WalletInterface;
}

export default CharacterDetailsInterface;
