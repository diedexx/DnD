import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommandProviderService from "../../../infrastructure/command/CommandProvider.service";
import InvalidCommand from "../../../infrastructure/command/exceptions/InvalidCommand.exception";
import Character from "../entities/Character.entity";
import Health from "../values/Health.value";
import TakeDamageCommand from "./TakeDamage.command";
import Mocked = jest.Mocked;

describe( "The TakeDamageCommand", () => {
	let takeDamageCommand: TakeDamageCommand;
	const character = new Character();
	character.name = "Steve";

	const characterRepositoryMock: Partial<Mocked<Repository<Character>>> = {
		save: jest.fn(),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				TakeDamageCommand,
				{ provide: getRepositoryToken( Character ), useValue: characterRepositoryMock },
				{ provide: CommandProviderService, useValue: null },
			],
		} ).compile();

		character.health = new Health( 50, 25 );

		takeDamageCommand = app.get<TakeDamageCommand>( TakeDamageCommand );
	} );

	describe( "getName function", () => {
		it( "describes the event", async () => {
			const actual = await takeDamageCommand.getName();
			expect( actual ).toMatchInlineSnapshot( "\"Damage\"" );
		} );
	} );

	describe( "getDescription function", () => {
		it( "describes the event in more detail", async () => {
			const actual = await takeDamageCommand.getDescription( { damage: 7 }, character );
			expect( actual ).toMatchInlineSnapshot( "\"Steve took 7 damage.\"" );
		} );
	} );
	describe( "getType function", () => {
		it( "describes the type of event", async () => {
			const actual = takeDamageCommand.getType();
			expect( actual ).toMatchInlineSnapshot( "\"TAKE_DAMAGE\"" );
		} );
	} );

	describe( "execute function", () => {
		it.each( [ -20, -1, 0, 0.9, 1.1, 20.2 ] )( "doesn't accept float values or values lower than 1: %d", async ( value ) => {
			expect.assertions( 1 );
			try {
				await takeDamageCommand.execute( { damage: value }, character );
			} catch ( e ) {
				expect( e ).toBeInstanceOf( InvalidCommand );
			}
		} );

		it( "registers damage on the character", async () => {
			await takeDamageCommand.execute( { damage: 11 }, character );
			const expectedHealth = new Health( 50, 14 );
			expect( characterRepositoryMock.save ).toHaveBeenCalledWith( Object.assign( {}, character, { health: expectedHealth } ) );
		} );

		it( "cannot take a character under 0 HP", async () => {
			await takeDamageCommand.execute( { damage: 75 }, character );
			const expectedHealth = new Health( 50, 0 );
			expect( characterRepositoryMock.save ).toHaveBeenCalledWith( Object.assign( {}, character, { health: expectedHealth } ) );
		} );
		it( "returns a heal action for the same amount to undo the damage", async () => {
			const undoAction = await takeDamageCommand.execute( { damage: 5 }, character );
			expect( undoAction ).toEqual( { type: "RECEIVE_HEALING", data: { healing: 5 } } );
		} );

		it( "returns a heal action that excludes damage taken beyond the current character health", async () => {
			const beforeHealth = character.health.currentHealth;
			const undoAction = await takeDamageCommand.execute( { damage: 200 }, character );
			expect( undoAction ).toEqual( { type: "RECEIVE_HEALING", data: { healing: beforeHealth } } );
		} );
	} );
} );
