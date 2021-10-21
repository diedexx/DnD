import { Module } from "@nestjs/common";
import { AbilityModule } from "../ability/Ability.module";
import DatabaseModule from "../database/Database.module";
import { ProficiencyModule } from "../proficiency/Proficiency.module";
import { ModifierCollectorService } from "./ModifierCollector.service";
import { ModifierOrchestratorService } from "./ModifierOrchestrator.service";
import WeaponModifierService from "./WeaponModifier.service";

@Module( {
	imports: [
		ProficiencyModule,
		DatabaseModule,
		AbilityModule,
	],
	providers: [
		ModifierOrchestratorService,
		ModifierCollectorService,
		WeaponModifierService,
	],
	exports: [
		ModifierOrchestratorService,
	],
} )
export class ModifierModule {
}
