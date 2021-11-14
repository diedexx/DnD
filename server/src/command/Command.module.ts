import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../database/Database.module";
import { SetTextFieldCommand } from "../domain/character/commands/SetTextFieldCommand";
import Character from "../domain/character/entities/Character.entity";
import CommandResolver from "./Command.resolver";
import CommandService from "./Command.service";
import CommandProviderService from "./CommandProvider.service";
import { NoopCommand } from "./commands/NoopCommand";
import Command from "./entities/Command.entity";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Command, Character ] ),
	],
	providers: [
		CommandProviderService,
		CommandService,
		NoopCommand,
		SetTextFieldCommand,
		CommandResolver,
		{ provide: "FallbackCommand", useClass: NoopCommand },
	],
	exports: [
		CommandService,
		CommandProviderService,
	],
} )
export class CommandModule {
}
