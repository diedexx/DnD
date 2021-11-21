import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export default class CreateAbilityScoreInputType {
	@Field( () => Int )
	public readonly abilityId: number;

	@Field( () => Int )
	public readonly modifier: number;

	@Field( () => Int )
	public readonly score: number;
}
