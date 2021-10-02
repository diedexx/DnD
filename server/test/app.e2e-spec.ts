import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getConnectionToken } from "@nestjs/typeorm";
import * as request from "supertest";
import { Connection, createConnection } from "typeorm";
import { AppModule } from "../src/App.module";
import { DatabaseConfigInterface } from "../src/config/database";
import DatabaseModule from "../src/database/Database.module";

describe( "AppController (e2e)", () => {
	let app: INestApplication;

	beforeEach( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule( {
			imports: [ AppModule, DatabaseModule ],
		} )
			.overrideProvider( getConnectionToken() ).useFactory( {
				inject: [ ConfigService ],
				factory: async ( configService: ConfigService ): Promise<Connection> => {
					return await createConnection(
						{
							...configService.get<DatabaseConfigInterface>( "database" ),
							...{
								type: "sqlite",
								database: ":memory:",
								synchronize: true,
							},
						},
					);
				},
			} )
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	} );

	it( "/ (GET)", () => {
		return request( app.getHttpServer() )
			.get( "/" )
			.expect( 200 )
			.expect( "Hello Nest World!" );
	} );
} );
