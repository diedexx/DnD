import Character from "../../character/entities/Character.entity";

type CreateAbilityScoreType = {
	character: Character;
	abilityId: number;
	modifier: number;
	baseScore: number;
}
export default CreateAbilityScoreType;
