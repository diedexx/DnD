import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../database/Database.module";
import Proficiency from "./entities/Proficiency.entity";
import { ProficiencyService } from "./Proficiency.service";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Proficiency ] ),
	],
	providers: [
		ProficiencyService,
	],
	exports: [
		ProficiencyService,
	],
} )
export class ProficiencyModule {
}
