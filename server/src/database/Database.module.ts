import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfigInterface } from "../config/database";
import RelationLoaderService from "./RelationLoader.service";

@Module( {
	imports: [
		TypeOrmModule.forRootAsync( {
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: ( configService: ConfigService ) => configService.get<DatabaseConfigInterface>( "database" ),
		} ),
	],
	providers: [
		RelationLoaderService,
	],
	exports: [
		RelationLoaderService,
		TypeOrmModule,
	],
} )
export default class DatabaseModule {
}
