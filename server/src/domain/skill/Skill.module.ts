import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AbilityModule } from "../ability/Ability.module";
import AbilityScore from "../ability/entities/AbilityScore.entity";
import DatabaseModule from "../../infrastructure/database/Database.module";
import { ModifierModule } from "../modifier/Modifier.module";
import Skill from "./entities/Skill.entity";
import SkillScore from "./entities/SkillScore.entity";
import SkillResolver from "./Skill.resolver";
import SkillScoreResolver from "./SkillScore.resolver";
import SkillScoreService from "./SkillScore.service";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Skill, SkillScore, AbilityScore ] ),
		AbilityModule,
		ModifierModule,
	],
	providers: [
		SkillResolver,
		SkillScoreResolver,
		SkillScoreService,
	],
} )
export class SkillModule {
}
