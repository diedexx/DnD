import { Test, TestingModule } from "@nestjs/testing";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "../../domain/character/entities/Character.entity";
import CommandExecutorService from "./CommandExecutor.service";
import CommandHistoryService from "./CommandHistory.service";
import CommandProviderService from "./CommandProvider.service";
import Command from "./entities/Command.entity";
import CannotExecuteCommand from "./exceptions/CannotExecuteCommand.exception";
import CannotRedoCommandException from "./exceptions/CannotRedoCommand.exception";
import CannotUndoCommandException from "./exceptions/CannotUndoCommand.exception";
import CommandInterface from "./interfaces/Command.interface";
import CommandReference from "./interfaces/CommandReference.interface";
import Mocked = jest.Mocked;

describe( "The commandExecutorService", () => {
	let commandExecutorService: CommandExecutorService;

	let character: Character;
	let command1: Command;

	const undoCommandRef: CommandReference = { type: "test", data: {} };

	const commandImplementationMock: Partial<Mocked<CommandInterface>> = {
		execute: jest.fn().mockResolvedValue( undoCommandRef ),
	};

	const commandProviderServiceMock: Partial<Mocked<CommandProviderService>> = {
		getCommand: jest.fn().mockReturnValue( commandImplementationMock ),
	};

	const commandHistoryServiceMock: Partial<Mocked<CommandHistoryService>> = {
		addToHistory: jest.fn(),
		updateInHistory: jest.fn(),
	};

	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = {
		loadRelations: jest.fn().mockImplementation(
			async ( command: Command ) => ( { ...command, character } ),
		),
	};

	beforeEach( async () => {
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
		command1.type = "type";
		command1.data = { some: "data" };
	} );

	describe( "executeCommand function", () => {
		it( "executes a command", async () => {
			expect.assertions( 2 );

			await commandExecutorService.executeCommand( command1 );

			expect( commandImplementationMock.execute ).toBeCalledTimes( 1 );
			expect( commandImplementationMock.execute ).toBeCalledWith( { some: "data" }, character );
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

			await commandExecutorService.executeCommand( command1 );
			expect( commandHistoryServiceMock.addToHistory ).toBeCalledTimes( 1 );
		} );

		it( "attaches an undo-command which reverts the command's effects", async () => {
			expect.assertions( 2 );

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

			await commandExecutorService.executeCommand( command1 );
			expect( commandHistoryServiceMock.addToHistory ).toBeCalledTimes( 1 );
			const args = commandHistoryServiceMock.addToHistory.mock.calls[ 0 ];
			expect( args[ 0 ].executedAt ).toBeDefined();
		} );
	} );

	describe( "undoCommand function", () => {
		const undoCommand = new Command();
		undoCommand.id = 2;
		undoCommand.type = "the undoing type";
		undoCommand.character = character;

		beforeEach( () => {
			command1.executedAt = new Date();

			relationLoaderServiceMock.loadRelations.mockResolvedValue(
				Object.assign( new Command(), command1, { undoCommand } ),
			);
		} );

		it( "should request a commandImplementation for the type of the undo command", async () => {
			await commandExecutorService.undoCommand( command1 );

			expect( commandProviderServiceMock.getCommand ).toHaveBeenCalledWith( "the undoing type" );
		} );

		it( "should execute the undoCommand that is linked to the given command", async () => {
			await commandExecutorService.undoCommand( command1 );

			expect( commandImplementationMock.execute ).toHaveBeenCalledWith( undoCommand.data, undoCommand.character );
		} );

		it( "should update the history", async () => {
			await commandExecutorService.undoCommand( command1 );

			expect( commandHistoryServiceMock.updateInHistory ).toHaveBeenCalledTimes( 1 );
		} );

		it( "should mark the command undone", async () => {
			await commandExecutorService.undoCommand( command1 );

			const args = commandHistoryServiceMock.updateInHistory.mock.calls[ 0 ];
			expect( args[ 0 ].undone ).toBeTruthy();
		} );

		it( "should mark the undoCommand as executed", async () => {
			await commandExecutorService.undoCommand( command1 );

			const args = commandHistoryServiceMock.updateInHistory.mock.calls[ 0 ];
			expect( args[ 0 ].undoCommand.executedAt ).toBeDefined();
		} );

		it( "should prevent undoing a command that was never executed", async () => {
			expect.assertions( 1 );
			command1.executedAt = null;
			try {
				await commandExecutorService.undoCommand( command1 );
			} catch ( e ) {
				expect( e ).toBeInstanceOf( CannotUndoCommandException );
			}
		} );
	} );

	describe( "redoCommand function", () => {
		beforeEach( () => {
			command1.undone = true;
		} );

		it( "should request a commandImplementation for the type of the command to redo", async () => {
			await commandExecutorService.redoCommand( command1 );

			expect( commandProviderServiceMock.getCommand ).toHaveBeenCalledWith( "type" );
		} );

		it( "should execute the command that is being redone", async () => {
			await commandExecutorService.redoCommand( command1 );

			expect( commandImplementationMock.execute ).toHaveBeenCalledWith( command1.data, command1.character );
		} );

		it( "should update the history", async () => {
			await commandExecutorService.redoCommand( command1 );

			expect( commandHistoryServiceMock.updateInHistory ).toHaveBeenCalledTimes( 1 );
		} );

		it( "should mark the command as not undone", async () => {
			await commandExecutorService.redoCommand( command1 );

			const args = commandHistoryServiceMock.updateInHistory.mock.calls[ 0 ];
			expect( args[ 0 ].undone ).toBeFalsy();
		} );

		it( "should prevent redoing commands that were never undone", async () => {
			command1.undone = false;
			try {
				await commandExecutorService.redoCommand( command1 );
			} catch ( e ) {
				expect( e ).toBeInstanceOf( CannotRedoCommandException );
			}
		} );
	} );
} );
