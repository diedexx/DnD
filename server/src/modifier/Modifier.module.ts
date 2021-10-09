import { Module } from "@nestjs/common";
import DatabaseModule from "../database/Database.module";
import { ProficiencyModule } from "../proficiency/Proficiency.module";
import { ModifierCollectorService } from "./ModifierCollector.service";
import { ModifierOrchestratorService } from "./ModifierOrchestrator.service";

@Module( {
	imports: [
		ProficiencyModule,
		DatabaseModule,
	],
	providers: [
		ModifierOrchestratorService,
		ModifierCollectorService,
	],
	exports: [
		ModifierOrchestratorService,
	],
} )
export class ModifierModule {
}
