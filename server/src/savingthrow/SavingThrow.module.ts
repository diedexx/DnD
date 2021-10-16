import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AbilityModule } from "../ability/Ability.module";
import DatabaseModule from "../database/Database.module";
import { ModifierModule } from "../modifier/Modifier.module";
import SavingThrow from "./entities/SavingThrow.entity";
import SavingThrowResolver from "./SavingThrow.resolver";
import SavingThrowService from "./SavingThrow.service";

@Module( {
	imports: [
		DatabaseModule,
		ModifierModule,
		AbilityModule,
		TypeOrmModule.forFeature( [ SavingThrow ] ),
	],
	providers: [
		SavingThrowResolver,
		SavingThrowService,
	],
} )
export class SavingThrowModule {
}
