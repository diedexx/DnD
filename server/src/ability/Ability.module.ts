import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../database/Database.module";
import AbilityResolver from "./Ability.resolver";
import AbilityScoreResolver from "./AbilityScore.resolver";
import AbilityScoreService from "./AbilityScore.service";
import Ability from "./entities/Ability.entity";
import AbilityScore from "./entities/AbilityScore.entity";
import Skill from "./entities/Skill.entity";
import SkillResolver from "./Skill.resolver";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Ability, Skill, AbilityScore ] ),
	],
	providers: [
		AbilityResolver,
		SkillResolver,
		AbilityScoreResolver,
		AbilityScoreService,
	],
	exports: [
		AbilityScoreService,
	],
} )
export class AbilityModule {
}
