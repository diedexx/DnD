import { Test, TestingModule } from "@nestjs/testing";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "../domain/character/entities/Character.entity";
import CommandExecutorService from "./CommandExecutor.service";
import CommandHistoryService from "./CommandHistory.service";
import CommandProviderService from "./CommandProvider.service";
import Command from "./entities/Command.entity";
import CannotExecuteCommand from "./exceptions/CannotExecuteCommand.exception";
import CommandInterface from "./interfaces/Command.interface";
import CommandReference from "./interfaces/CommandReference.interface";
import Mocked = jest.Mocked;

describe( "The commandExecutorService", () => {
	let commandExecutorService: CommandExecutorService;

	let character: Character;
	let command1: Command;

	const undoCommandRef: CommandReference = { type: "test", data: {} };

	const commandImplementation: Partial<Mocked<CommandInterface>> = {
		execute: jest.fn().mockResolvedValue( undoCommandRef ),
	};

	const commandProviderServiceMock: Partial<Mocked<CommandProviderService>> = {
		getCommand: jest.fn(),
	};

	const commandHistoryServiceMock: Partial<Mocked<CommandHistoryService>> = {
		addToHistory: jest.fn(),
	};

	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore This is fine as long as loadRelations is called with a single entity.
		loadRelations: jest.fn( ( command ) => Object.assign( command, { character } ) ),
	};

	beforeEach( async () => {
		jest.clearAllMocks();
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				CommandExecutorService,
				{ provide: CommandProviderService, useValue: commandProviderServiceMock },
				{ provide: RelationLoaderService, useValue: relationLoaderServiceMock },
				{ provide: CommandHistoryService, useValue: commandHistoryServiceMock },
			],
		} ).compile();

		commandExecutorService = app.get<CommandExecutorService>( CommandExecutorService );

		character = new Character();
		command1 = new Command();
		command1.data = { some: "data" };
	} );

	describe( "executeCommand function", () => {
		it( "executes a command", async () => {
			expect.assertions( 2 );
			commandProviderServiceMock.getCommand.mockReturnValueOnce( commandImplementation as CommandInterface );

			await commandExecutorService.executeCommand( command1 );

			expect( commandImplementation.execute ).toBeCalledTimes( 1 );
			expect( commandImplementation.execute ).toBeCalledWith( { some: "data" }, character );
		} );

		it( "prevents executing a command twice", async () => {
			expect.assertions( 1 );
			command1.executedAt = new Date();
			try {
				await commandExecutorService.executeCommand( command1 );
			} catch ( e ) {
				expect( e ).toBeInstanceOf( CannotExecuteCommand );
			}
		} );

		it( "adds the executed command to the history", async () => {
			expect.assertions( 1 );
			commandProviderServiceMock.getCommand.mockReturnValueOnce( commandImplementation as CommandInterface );

			await commandExecutorService.executeCommand( command1 );
			expect( commandHistoryServiceMock.addToHistory ).toBeCalledTimes( 1 );
		} );

		it( "attaches an undo-command which reverts the command's effects", async () => {
			expect.assertions( 2 );
			commandProviderServiceMock.getCommand.mockReturnValueOnce( commandImplementation as CommandInterface );

			await commandExecutorService.executeCommand( command1 );
			expect( commandHistoryServiceMock.addToHistory ).toBeCalledTimes( 1 );
			const args = commandHistoryServiceMock.addToHistory.mock.calls[ 0 ];
			expect( args[ 0 ].undoCommand ).toMatchInlineSnapshot( `
Command {
  "character": Character {},
  "data": Object {},
  "type": "test",
  "undone": false,
}
` );
		} );

		it( "sets the moment on which the command was executed", async () => {
			expect.assertions( 2 );
			commandProviderServiceMock.getCommand.mockReturnValueOnce( commandImplementation as CommandInterface );

			await commandExecutorService.executeCommand( command1 );
			expect( commandHistoryServiceMock.addToHistory ).toBeCalledTimes( 1 );
			const args = commandHistoryServiceMock.addToHistory.mock.calls[ 0 ];
			expect( args[ 0 ].executedAt ).toBeDefined();
		} );
	} );
} );
