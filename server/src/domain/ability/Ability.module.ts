import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommandModule } from "../../infrastructure/command/Command.module";
import DatabaseModule from "../../infrastructure/database/Database.module";
import Character from "../character/entities/Character.entity";
import AbilityResolver from "./Ability.resolver";
import AbilityService from "./Ability.service";
import AbilityScoreResolver from "./AbilityScore.resolver";
import AbilityScoreService from "./AbilityScore.service";
import UpdateAbilityScoreCommand from "./commands/UpdateAbilityScore.command";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Character, Ability, AbilityScore ] ),
		CommandModule,
	],
	providers: [
		AbilityResolver,
		AbilityScoreResolver,
		AbilityScoreService,
		AbilityService,
		UpdateAbilityScoreCommand,
	],
	exports: [
		AbilityService,
		AbilityScoreService,
	],
} )
export class AbilityModule {
}
