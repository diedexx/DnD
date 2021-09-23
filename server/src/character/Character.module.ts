import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../database/Database.module";
import CharacterResolver from "./Character.resolver";
import CharacterClassResolver from "./CharacterClass.resolver";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Character, CharacterClass ] ),
	],
	providers: [
		CharacterResolver,
		CharacterClassResolver,
	],
} )
export class CharacterModule {
}
