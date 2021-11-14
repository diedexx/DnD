import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommandModule } from "../../command/Command.module";
import { AbilityModule } from "../ability/Ability.module";
import DatabaseModule from "../../database/Database.module";
import { ModifierModule } from "../modifier/Modifier.module";
import CharacterResolver from "./Character.resolver";
import CharacterService from "./Character.service";
import CharacterClassResolver from "./CharacterClass.resolver";
import { SetTextFieldCommand } from "./commands/SetTextField.command";
import Character from "./entities/Character.entity";
import CharacterClass from "./entities/CharacterClass.entity";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Character, CharacterClass ] ),
		AbilityModule,
		ModifierModule,
		CommandModule,
	],
	providers: [
		SetTextFieldCommand,
		CharacterService,
		CharacterResolver,
		CharacterClassResolver,
	],
} )
export class CharacterModule {
}
