import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommandProviderService from "../../../infrastructure/command/CommandProvider.service";
import InvalidCommand from "../../../infrastructure/command/exceptions/InvalidCommand.exception";
import Character from "../entities/Character.entity";
import Health from "../values/Health.value";
import ReceiveHealing from "./ReceiveHealing.command";
import Mocked = jest.Mocked;

describe( "The ReceiveHealing", () => {
	let receiveHealingCommand: ReceiveHealing;
	const character = new Character();
	character.name = "Steve";

	const characterRepositoryMock: Partial<Mocked<Repository<Character>>> = {
		save: jest.fn(),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				ReceiveHealing,
				{ provide: getRepositoryToken( Character ), useValue: characterRepositoryMock },
				{ provide: CommandProviderService, useValue: null },
			],
		} ).compile();

		character.health = new Health( 50, 25 );

		receiveHealingCommand = app.get<ReceiveHealing>( ReceiveHealing );
	} );

	describe( "getName function", () => {
		it( "describes the event", async () => {
			const actual = await receiveHealingCommand.getName();
			expect( actual ).toMatchInlineSnapshot( "\"Heal\"" );
		} );
	} );

	describe( "getDescription function", () => {
		it( "describes the event in more detail", async () => {
			const actual = await receiveHealingCommand.getDescription( { healing: 7 }, character );
			expect( actual ).toMatchInlineSnapshot( "\"Steve was healed for 7 HP.\"" );
		} );
	} );
	describe( "getType function", () => {
		it( "describes the type of event", async () => {
			const actual = receiveHealingCommand.getType();
			expect( actual ).toMatchInlineSnapshot( "\"RECEIVE_HEALING\"" );
		} );
	} );

	describe( "execute function", () => {
		it.each( [ -20, -1, 0, 0.9, 1.1, 20.2 ] )( "doesn't accept float values or values lower than 1: %d", async ( value ) => {
			expect.assertions( 1 );
			try {
				await receiveHealingCommand.execute( { healing: value }, character );
			} catch ( e ) {
				expect( e ).toBeInstanceOf( InvalidCommand );
			}
		} );

		it( "registers damage on the character", async () => {
			await receiveHealingCommand.execute( { healing: 11 }, character );
			const expectedHealth = new Health( 50, 36 );
			expect( characterRepositoryMock.save ).toHaveBeenCalledWith( Object.assign( {}, character, { health: expectedHealth } ) );
		} );

		it( "cannot take a character over max health", async () => {
			await receiveHealingCommand.execute( { healing: 75 }, character );
			const expectedHealth = new Health( 50, 50 );
			expect( characterRepositoryMock.save ).toHaveBeenCalledWith( Object.assign( {}, character, { health: expectedHealth } ) );
		} );
		it( "returns a heal action for the same amount to undo the damage", async () => {
			const undoAction = await receiveHealingCommand.execute( { healing: 5 }, character );
			expect( undoAction ).toEqual( { type: "TAKE_DAMAGE", data: { damage: 5 } } );
		} );

		it( "returns a damage action that excludes over-healing", async () => {
			const beforeHealth = character.health.currentHealth;
			const undoAction = await receiveHealingCommand.execute( { healing: 200 }, character );
			expect( undoAction ).toEqual( { type: "TAKE_DAMAGE", data: { damage: beforeHealth } } );
		} );
	} );
} );
