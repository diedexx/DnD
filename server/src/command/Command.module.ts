import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../database/Database.module";
import Character from "../domain/character/entities/Character.entity";
import CommandResolver from "./Command.resolver";
import CommandService from "./Command.service";
import CommandProviderService from "./CommandProvider.service";
import { NoopCommand } from "./commands/NoopCommand";
import { SetTextFieldCommand } from "./commands/SetTextFieldCommand";
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
		{
			provide: "COMMANDS",
			inject: [ SetTextFieldCommand ],
			useFactory: (
				setTextFieldCommand: SetTextFieldCommand,
			) => {
				return [ setTextFieldCommand ];
			},
		},
	],
	exports: [
		CommandService,
	],
} )
export class CommandModule {
}
