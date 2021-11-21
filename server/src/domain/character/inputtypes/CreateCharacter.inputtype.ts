import { Field, InputType, Int } from "@nestjs/graphql";
import { CharacterAlignment, CharacterBackground, CharacterRace } from "../entities/Character.entity";

@InputType()
export default class CreateCharacterInputType {
	@Field()
	public readonly name: string;

	@Field( () => Int )
	public readonly classId: number;

	@Field()
	public readonly race: CharacterRace;

	@Field( () => Int )
	public readonly maxHealth: number;

	@Field()
	public readonly alignment: CharacterAlignment;

	@Field()
	public readonly bonds: string;

	@Field()
	public readonly background: CharacterBackground;

	@Field()
	public readonly personalityTraits: string;

	@Field()
	public readonly flaws: string;

	@Field()
	public readonly ideals: string;
}

