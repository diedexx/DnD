import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { cloneDeep } from "lodash";
import { Repository } from "typeorm";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "../domain/character/entities/Character.entity";
import LinkedList from "../structures/linkedList/LinkedList";
import CommandService from "./Command.service";
import CommandProviderService from "./CommandProvider.service";
import Command from "./entities/Command.entity";
import CannotExecuteCommand from "./exceptions/CannotExecuteCommand.exception";
import CommandInterface from "./interfaces/Command.interface";
import Mocked = jest.Mocked;

describe( "The CommandService", () => {
	let commandService: CommandService;

	const undoCommandReferenceStub = {
		type: "The testing type",
		data: { something: "containing data" },
	};

	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = {
		loadRelations: jest.fn(),
	};

	const commandExecutorMock: Partial<Mocked<CommandInterface>> = {
		execute: jest.fn().mockResolvedValue( undoCommandReferenceStub ),
		getType: jest.fn(),
	};

	const commandProviderServiceMock: Partial<Mocked<CommandProviderService>> = {
		getCommand: jest.fn().mockReturnValue( commandExecutorMock ),
	};

	const commandRepositoryMock: Partial<Mocked<Repository<Command>>> = {
		save: jest.fn().mockImplementation( async ( x ) => x ),
		find: jest.fn().mockResolvedValue( [] ),
		"delete": jest.fn(),
	};

	const character1 = Object.assign( new Character(), { id: 1 } );
	const command: Command = new Command();
	command.data = { something: "containing data" };

	command.type = "The testing type";

	beforeEach( async () => {
		jest.clearAllMocks();
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				CommandService,
				{ provide: RelationLoaderService, useValue: relationLoaderServiceMock },
				{ provide: CommandProviderService, useValue: commandProviderServiceMock },
				{ provide: getRepositoryToken( Command ), useValue: commandRepositoryMock },
			],
		} ).compile();
		commandService = app.get<CommandService>( CommandService );
	} );

	describe( "createCommand function", () => {
		it( "transforms a reference into an entity", async () => {
			expect(
				await commandService.createCommand(
					{ data: { ding: "dong" }, type: "testCommand" },
					cloneDeep( character1 ) ) ).toMatchInlineSnapshot( `
Command {
  "character": Character {
    "id": 1,
  },
  "data": Object {
    "ding": "dong",
  },
  "type": "testCommand",
  "undone": false,
}
` );
		} );
	} );

	describe( "executeCommand function", () => {
		relationLoaderServiceMock.loadRelations.mockImplementation( async ( command1: Command ) => {
			command1.character = character1;
			return command1;
		} );

		it( "executes the right comment", async () => {
			await commandService.executeCommand( cloneDeep( command ) );
			expect( commandProviderServiceMock.getCommand ).toBeCalledWith( command.type );
			expect( commandExecutorMock.execute ).toBeCalledWith( command.data, character1 );
		} );

		it( "adds the executed command to the history and keeps track of the undo action and the moment of execution", async () => {
			// Freeze time.
			const now = new Date();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const spy = jest.spyOn( global, "Date" ).mockImplementation( () => now );

			commandService.addToHistory = jest.fn();

			await commandService.executeCommand( cloneDeep( command ) );

			const expectedUndoCommand = new Command();
			expectedUndoCommand.type = undoCommandReferenceStub.type;
			expectedUndoCommand.data = undoCommandReferenceStub.data;
			expectedUndoCommand.undone = false;
			expectedUndoCommand.character = character1;

			const expected = Object.assign( new Command(), cloneDeep( command ), {
				executedAt: new Date(),
				undoCommand: expectedUndoCommand,
				character: character1,
			} );

			expect( commandService.addToHistory ).toBeCalledWith( expected );
			spy.mockRestore();
		} );

		it( "prevents executing a command more than once", async () => {
			expect.assertions( 1 );
			const executedCommand = Object.assign( {}, command, { executedAt: new Date() } );
			try {
				await commandService.executeCommand( executedCommand );
			} catch ( e ) {
				expect( e ).toBeInstanceOf( CannotExecuteCommand );
			}
		} );
	} );

	describe( "persist function", () => {
		it( "saves a list of scheduled commands to the database", async () => {
			const history = new LinkedList<Command>();
			const command1 = Object.assign( new Command(), cloneDeep( command ), { data: { command: "nr1" } } );
			const command2 = Object.assign( new Command(), cloneDeep( command ), { data: { command: "nr2" } } );
			history.append( command1 );
			history.append( command2 );

			await commandService.persist( history );

			expect( commandRepositoryMock.save ).toBeCalledWith( [ command1, command2 ] );
		} );
	} );

	describe( "getCommandHistory function", () => {
		const character = new Character();
		character.id = 12;

		const command1 = new Command();
		const command2 = new Command();
		const command3 = new Command();

		command1.type = "test command";
		command2.type = "second";
		command3.type = "last test";
		command1.data = { an: "object" };
		command2.data = { more: "data" };
		command3.data = {};

		it( "get an ordered list of commands from the database", async () => {
			commandRepositoryMock.find.mockResolvedValueOnce( [ command1, command2, command3 ] );

			relationLoaderServiceMock.loadRelations.mockImplementation(
				async ( commands: Command[] ) => {
					return commands.map( cmd => ( { ...cmd, character } ) );
				},
			);

			commandProviderServiceMock.getCommand.mockImplementation( ( type ): any => ( { data: { cmdType: type } } ) );

			const actual = await commandService.getCommandHistory( character.id );

			expect( actual ).toMatchInlineSnapshot( `
LinkedList {
  "firstNode": LinkedListNode {
    "data": Object {
      "character": Character {
        "id": 12,
      },
      "data": Object {
        "an": "object",
      },
      "type": "test command",
    },
    "next": LinkedListNode {
      "data": Object {
        "character": Character {
          "id": 12,
        },
        "data": Object {
          "more": "data",
        },
        "type": "second",
      },
      "next": LinkedListNode {
        "data": Object {
          "character": Character {
            "id": 12,
          },
          "data": Object {},
          "type": "last test",
        },
        "next": null,
        "prev": [Circular],
      },
      "prev": [Circular],
    },
    "prev": null,
  },
  "lastNode": LinkedListNode {
    "data": Object {
      "character": Character {
        "id": 12,
      },
      "data": Object {},
      "type": "last test",
    },
    "next": null,
    "prev": LinkedListNode {
      "data": Object {
        "character": Character {
          "id": 12,
        },
        "data": Object {
          "more": "data",
        },
        "type": "second",
      },
      "next": [Circular],
      "prev": LinkedListNode {
        "data": Object {
          "character": Character {
            "id": 12,
          },
          "data": Object {
            "an": "object",
          },
          "type": "test command",
        },
        "next": [Circular],
        "prev": null,
      },
    },
  },
}
` );
		} );
	} );
} );
