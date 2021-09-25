import { Field, InputType, Int } from "@nestjs/graphql";
import { CharacterAlignment, CharacterBackground, CharacterRace } from "../entities/Character.entity";

@InputType()
export default class CreateCharacterInputType {
	@Field()
	name: string;

	@Field( () => Int )
	classId: number;

	@Field()
	race: CharacterRace;

	@Field( () => Int )
	maxHealth: number;

	@Field()
	alignment: CharacterAlignment;

	@Field()
	bonds: string;

	@Field()
	background: CharacterBackground;

	@Field()
	personalityTraits: string;

	@Field()
	flaws: string;

	@Field()
	ideals: string;
}

