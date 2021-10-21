import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../database/Database.module";
import AbilityResolver from "./Ability.resolver";
import AbilityService from "./Ability.service";
import AbilityScoreResolver from "./AbilityScore.resolver";
import AbilityScoreService from "./AbilityScore.service";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Ability, AbilityScore ] ),
	],
	providers: [
		AbilityResolver,
		AbilityScoreResolver,
		AbilityScoreService,
		AbilityService,
	],
	exports: [
		AbilityService,
		AbilityScoreService,
	],
} )
export class AbilityModule {
}
