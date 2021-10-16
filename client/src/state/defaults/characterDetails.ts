import CharacterDetailsInterface from "../../interfaces/CharacterDetails.interface";
import defaultModifier from "./modifier";

const defaultCharacterDetails: CharacterDetailsInterface = {
	id: 0,
	name: "",
	experience: 0,
	health: {
		displayHealth: "0/1",
		currentHealth: 0,
		maxHealth: 1,
	},
	alignment: "",
	background: "",
	"class": { name: "" },
	bonds: "",
	flaws: "",
	level: 0,
	race: "",
	personalityTraits: "",
	ideals: "",
	proficiencies: [],
	abilityScores: [],
	skillScores: [],
	savingThrows: [],
	weapons: [],
	equipment: [],
	spells: [],
	wallet: {
		copper: 0,
		silver: 0,
		electrum: 0,
		gold: 0,
		platinum: 0,
	},
	deathSave: {
		successes: 0,
		failures: 0,
	},
	hitDice: {
		displayValue: "",
	},
	proficiencyBonus: defaultModifier,
	armorClassModifier: defaultModifier,
	initiativeModifier: defaultModifier,
	speedModifier: defaultModifier,
};

export default defaultCharacterDetails;
