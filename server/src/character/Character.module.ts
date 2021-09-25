import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AbilityModule } from "../ability/Ability.module";
import DatabaseModule from "../database/Database.module";
import CharacterResolver from "./Character.resolver";
import CharacterClassResolver from "./CharacterClass.resolver";
import Character from "./entities/Character.entity";
import CharacterService from "./Character.service";
import CharacterClass from "./entities/CharacterClass.entity";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Character, CharacterClass ] ),
		AbilityModule,
	],
	providers: [
		CharacterService,
		CharacterResolver,
		CharacterClassResolver,
	],
} )
export class CharacterModule {
}
