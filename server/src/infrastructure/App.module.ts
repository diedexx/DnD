import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AbilityModule } from "../domain/ability/Ability.module";
import { CategoryModule } from "../domain/category/Category.module";
import { CharacterModule } from "../domain/character/Character.module";
import { DamageModule } from "../domain/damage/Damage.module";
import { EquipmentModule } from "../domain/equipment/Equipment.module";
import { ModifierModule } from "../domain/modifier/Modifier.module";
import { MoneyModule } from "../domain/money/Money.module";
import { ProficiencyModule } from "../domain/proficiency/Proficiency.module";
import { SavingThrowModule } from "../domain/savingthrow/SavingThrow.module";
import { SkillModule } from "../domain/skill/Skill.module";
import { SpellModule } from "../domain/spell/Spell.module";
import { WeaponModule } from "../domain/weapon/Weapon.module";
import DatabaseConfig from "./config/database";
import GraphQLConfig, { GraphQLConfigInterface } from "./config/graphQL";
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
		SavingThrowModule,
		ModifierModule,
		WeaponModule,
		DamageModule,
		MoneyModule,
		ProficiencyModule,
		CategoryModule,
		EquipmentModule,
		SpellModule,
	],
	controllers: [],
	providers: [],
} )
export class AppModule {
}
