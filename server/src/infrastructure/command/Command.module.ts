import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../database/Database.module";
import Character from "../../domain/character/entities/Character.entity";
import CommandResolver from "./Command.resolver";
import CommandService from "./Command.service";
import CommandExecutorService from "./CommandExecutor.service";
import CommandHistoryService from "./CommandHistory.service";
import CommandProviderService from "./CommandProvider.service";
import { NoopCommand } from "./commands/Noop.command";
import Command from "./entities/Command.entity";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Command, Character ] ),
	],
	providers: [
		CommandProviderService,
		CommandService,
		CommandResolver,
		CommandExecutorService,
		CommandHistoryService,
		{ provide: "FallbackCommand", useClass: NoopCommand },
	],
	exports: [
		CommandService,
		CommandProviderService,
	],
} )
export class CommandModule {
}
