import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getConnectionToken } from "@nestjs/typeorm";
import * as request from "supertest";
import { Connection, createConnection } from "typeorm";
import { AppModule } from "../src/app.module";

describe( "AppController (e2e)", () => {
	let app: INestApplication;

	beforeEach( async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule( {
			imports: [ AppModule ],
		} )
			.overrideProvider( getConnectionToken() ).useFactory( {
				factory: async (): Promise<Connection> => {
					return await createConnection( { type: "sqlite", database: ":memory:", synchronize: true } );
				},
			} ).compile();

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
