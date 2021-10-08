import CharacterDetailsInterface from "../../interfaces/CharacterDetails.interface";

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
	abilityScores: [],
	skillScores: [],
	weapons: [],
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
};

export default defaultCharacterDetails;
