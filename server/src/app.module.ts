import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CharacterModule } from "./character/Character.module";
import DatabaseConfig, { DatabaseConfigInterface } from "./config/database";

@Module( {
	imports: [
		ConfigModule.forRoot( { load: [ DatabaseConfig ] } ),
		TypeOrmModule.forRootAsync( {
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: ( config: ConfigService ) => config.get<DatabaseConfigInterface>( "database" ),
		} ),
		CharacterModule,
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
