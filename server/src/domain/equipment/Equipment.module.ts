import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DatabaseModule from "../../infrastructure/database/Database.module";
import Equipment from "./entities/Equipment.entity";
import EquipmentResolver from "./Equipment.resolver";

@Module( {
	imports: [
		TypeOrmModule.forFeature( [ Equipment ] ),
		DatabaseModule,
	],
	providers: [
		EquipmentResolver,
	],
} )
export class EquipmentModule {
}
