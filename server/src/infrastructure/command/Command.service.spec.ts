import { Test, TestingModule } from "@nestjs/testing";
import { cloneDeep } from "lodash";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "../../domain/character/entities/Character.entity";
import LinkedList from "../structures/linkedList/LinkedList";
import CommandService from "./Command.service";
import CommandExecutorService from "./CommandExecutor.service";
import CommandHistoryService from "./CommandHistory.service";
import CommandProviderService from "./CommandProvider.service";
import Command from "./entities/Command.entity";
import CommandInterface from "./interfaces/Command.interface";
import Mocked = jest.Mocked;

describe( "The CommandService", () => {
	let commandService: CommandService;

	const commandReferenceStub = {
		type: "The testing type",
		data: { something: "containing data" },
	};

	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = {
		loadRelations: jest.fn(),
	};

	const commandHistoryServiceMock: Partial<Mocked<CommandHistoryService>> = {
		getCommandHistory: jest.fn(),
	};

	const commandExecutorServiceMock: Partial<Mocked<CommandExecutorService>> = {
		executeCommand: jest.fn(),
		undoCommand: jest.fn(),
		redoCommand: jest.fn(),
	};

	const commandImplementationMock: Partial<Mocked<CommandInterface>> = {
		getName: jest.fn().mockReturnValue( "name" ),
		getDescription: jest.fn().mockReturnValue( "description" ),
	};

	const commandProviderServiceMock: Partial<Mocked<CommandProviderService>> = {
		getCommand: jest.fn().mockReturnValue( commandImplementationMock ),
	};

	const character1 = Object.assign( new Character(), { id: 1 } );

	const baseCommand: Command = new Command();
	baseCommand.data = { something: "containing data" };
	baseCommand.type = "The testing type";

	const history = new LinkedList<Command>();
	const command1 = Object.assign( new Command(), cloneDeep( baseCommand ), { data: { command: "nr1" } } );
	const command2 = Object.assign( new Command(), cloneDeep( baseCommand ), { data: { command: "nr2" } } );
	const command3 = Object.assign( new Command(), cloneDeep( baseCommand ), { data: { command: "nr3" } } );
	const command4 = Object.assign( new Command(), cloneDeep( baseCommand ), { data: { command: "nr4" } } );
	history.append( command1 );
	history.append( command2 );
	history.append( command3 );
	history.append( command4 );

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				CommandService,
				{ provide: RelationLoaderService, useValue: relationLoaderServiceMock },
				{ provide: CommandProviderService, useValue: commandProviderServiceMock },
				{ provide: CommandHistoryService, useValue: commandHistoryServiceMock },
				{ provide: CommandExecutorService, useValue: commandExecutorServiceMock },
			],
		} ).compile();
		commandService = app.get<CommandService>( CommandService );
	} );

	describe( "executeCommand function", () => {
		it( "executes the right comment", async () => {
			expect.assertions( 2 );
			await commandService.executeCommand( commandReferenceStub, character1 );
			expect( commandExecutorServiceMock.executeCommand ).toBeCalledTimes( 1 );
			const args = commandExecutorServiceMock.executeCommand.mock.calls[ 0 ];
			expect( args[ 0 ] ).toMatchInlineSnapshot( `
Command {
  "character": Character {
    "id": 1,
  },
  "data": Object {
    "something": "containing data",
  },
  "type": "The testing type",
  "undone": false,
}
` );
		} );
	} );

	describe( "undoLastCommand function", () => {
		it( "does nothing when there is nothing to undo", async () => {
			expect.assertions( 1 );
			commandHistoryServiceMock.getCommandHistory.mockResolvedValueOnce( new LinkedList() );
			await commandService.undoLastCommand( 1 );
			expect( commandExecutorServiceMock.executeCommand ).not.toHaveBeenCalled();
		} );

		it( "undoes the last command in the history", async () => {
			expect.assertions( 2 );
			commandHistoryServiceMock.getCommandHistory.mockResolvedValueOnce( history );
			await commandService.undoLastCommand( 1 );
			expect( commandExecutorServiceMock.undoCommand ).toHaveBeenCalledTimes( 1 );
			expect( commandExecutorServiceMock.undoCommand ).toHaveBeenCalledWith( command4 );
		} );
	} );

	describe( "the redoLastUndoneCommand function", () => {
		it( "redoes the command that was undone most recently", async () => {
			const history1 = new LinkedList<Command>();
			const undoneCommand3 = Object.assign( new Command(), cloneDeep( command3 ), { undone: true } );
			const undoneCommand4 = Object.assign( new Command(), cloneDeep( command4 ), { undone: true } );
			history1.append( command1 );
			history1.append( command2 );
			history1.append( undoneCommand3 );
			history1.append( undoneCommand4 );

			commandHistoryServiceMock.getCommandHistory.mockResolvedValueOnce( history1 );

			await commandService.redoLastUndoneCommand( 1 );
			expect( commandExecutorServiceMock.redoCommand ).toBeCalledWith( undoneCommand3 );
		} );

		it( "should not do anything if there are no commands", async () => {
			const history1 = new LinkedList<Command>();
			commandHistoryServiceMock.getCommandHistory.mockResolvedValueOnce( history1 );
			await commandService.redoLastUndoneCommand( 1 );
			expect( commandExecutorServiceMock.redoCommand ).not.toBeCalled();
		} );

		it( "should not do anything if the most recent command is not undone", async () => {
			commandHistoryServiceMock.getCommandHistory.mockResolvedValueOnce( history );
			await commandService.redoLastUndoneCommand( 1 );
			expect( commandExecutorServiceMock.redoCommand ).not.toBeCalled();
		} );
	} );

	describe( "getCommandInfo function", () => {
		relationLoaderServiceMock.loadRelations.mockImplementation(
			async ( command: Command ) => ( { ...command, character1 } ),
		);

		it( "should combine the command's name and description", async () => {
			// Relies on global mock implementations.
			const result = await commandService.getCommandInfo( command1 );
			expect( result ).toStrictEqual( { description: "description", name: "name" } );
		} );
	} );
} );
