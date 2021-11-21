import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../../infrastructure/database/Database.module";
import { ModifierModule } from "../modifier/Modifier.module";
import { Weapon } from "./entities/Weapon.entity";
import WeaponResolver from "./Weapon.resolver";
import WeaponService from "./weapon.service";

@Module( {
	imports: [
		DatabaseModule,
		TypeOrmModule.forFeature( [ Weapon ] ),
		ModifierModule,
	],
	providers: [
		WeaponResolver,
		WeaponService,
	],
} )
export class WeaponModule {
}
