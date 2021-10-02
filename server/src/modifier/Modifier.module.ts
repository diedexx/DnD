import { Module } from "@nestjs/common";
import { ModifierCollectorService } from "./ModifierCollector.service";
import { ModifierOrchestratorService } from "./ModifierOrchestrator.service";

@Module( {
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
