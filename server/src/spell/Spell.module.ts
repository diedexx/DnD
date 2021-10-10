import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Spell from "./entities/Spell.entity";
import AbilityPlusLevelLimiter from "./preparation/AbilityPlusLevelLimiter.service";
import AbilityPlusLevelLimiterRules from "./preparation/AbilityPlusLevelLimiterRules.service";
import PreparationLimiterFactory from "./preparation/PreparationLimiter.factory";
import UnlimitedPreparationLimiter from "./preparation/UnlimitedPreparationLimiter.service";
import SpellResolver from "./Spell.resolver";
import { SpellService } from "./Spell.service";

@Module( {
	imports: [
		TypeOrmModule.forFeature( [ Spell ] ),
	],
	providers: [
		SpellService,
		SpellResolver,
		PreparationLimiterFactory,
		AbilityPlusLevelLimiterRules,
		{ provide: "PreparationLimiters", useValue: [ AbilityPlusLevelLimiter ] },
		{ provide: "FallbackPreparationLimiter", useValue: UnlimitedPreparationLimiter },
	],
} )
export class SpellModule {
}
