import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export default class CreateAbilityScoreInputType {
	@Field( () => Int )
	abilityId: number;

	@Field( () => Int )
	modifier: number;

	@Field( () => Int )
	score: number;
}
