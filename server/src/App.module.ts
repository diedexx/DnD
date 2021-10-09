import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AbilityModule } from "./ability/Ability.module";
import { AppController } from "./App.controller";
import { AppService } from "./App.service";
import { CharacterModule } from "./character/Character.module";
import DatabaseConfig from "./config/database";
import GraphQLConfig, { GraphQLConfigInterface } from "./config/graphQL";
import { SkillModule } from "./skill/Skill.module";
import { ModifierModule } from "./modifier/Modifier.module";
import { WeaponModule } from "./weapon/Weapon.module";
import { DamageModule } from "./damage/Damage.module";
import { MoneyModule } from "./money/Money.module";
import { ProficiencyModule } from "./proficiency/Proficiency.module";
import { CategoryModule } from "./category/Category.module";
import DatabaseModule from "./database/Database.module";

@Module( {
	imports: [
		ConfigModule.forRoot( { load: [ DatabaseConfig, GraphQLConfig ] } ),
		GraphQLModule.forRootAsync( {
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: ( config: ConfigService ) => config.get<GraphQLConfigInterface>( "graphql" ),
		} ),
		DatabaseModule,
		CharacterModule,
		AbilityModule,
		SkillModule,
		ModifierModule,
		WeaponModule,
		DamageModule,
		MoneyModule,
		ProficiencyModule,
		CategoryModule,
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService,
	],
} )
export class AppModule {
}
