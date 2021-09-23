import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AbilityModule } from "./ability/Ability.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CharacterModule } from "./character/Character.module";
import DatabaseConfig from "./config/database";
import GraphQLConfig, { GraphQLConfigInterface } from "./config/graphQL";
import DatabaseModule from "./database/Database.module";

@Module( {
	imports: [
		ConfigModule.forRoot( { load: [ DatabaseConfig, GraphQLConfig ] } ),
		DatabaseModule,
		GraphQLModule.forRootAsync( {
			imports: [ ConfigModule ],
			inject: [ ConfigService ],
			useFactory: ( config: ConfigService ) => config.get<GraphQLConfigInterface>( "graphql" ),
		} ),
		CharacterModule,
		AbilityModule,
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
