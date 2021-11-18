import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import RelationLoaderService from "../database/RelationLoader.service";
import Character from "../domain/character/entities/Character.entity";
import CommandHistoryService from "./CommandHistory.service";
import Command from "./entities/Command.entity";
import Mocked = jest.Mocked;

describe( "The CommandHistoryService", () => {
	let commandHistoryService: CommandHistoryService;

	const commandRepositoryMock: Partial<Mocked<Repository<Command>>> = {
		find: jest.fn( async () => [] ),
		save: jest.fn(),
		"delete": jest.fn(),
	};

	const relationLoaderServiceMock: Partial<Mocked<RelationLoaderService>> = {
		loadRelations: jest.fn(),
	};

	const character = new Character();
	character.id = 12;

	const command1 = Object.assign( new Command(), {
		id: 1,
		type: "test command",
		data: { an: "object" },
		character: character,
		undoCommandId: 2,
	} );
	const command2 = Object.assign( new Command(), {
		id: 3,
		type: "second",
		data: { more: "data" },
		character: character,
		undoCommandId: 4,
	} );
	const command3 = Object.assign( new Command(), {
		id: 5,
		type: "last test",
		data: {},
		character: character,
		undoCommandId: 6,
	} );

	beforeEach( async () => {
		jest.clearAllMocks();
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				CommandHistoryService,
				{ provide: RelationLoaderService, useValue: relationLoaderServiceMock },
				{ provide: getRepositoryToken( Command ), useValue: commandRepositoryMock },
			],
		} ).compile();

		commandHistoryService = app.get<CommandHistoryService>( CommandHistoryService );
	} );

	describe( "getCommandHistory function", () => {
		it( "get an ordered list of commands from the database", async () => {
			commandRepositoryMock.find.mockResolvedValueOnce( [ command1, command2, command3 ] );

			relationLoaderServiceMock.loadRelations.mockImplementation(
				async ( commands: Command[] ) => {
					return commands.map( cmd => ( { ...cmd, character } ) );
				},
			);

			const actual = await commandHistoryService.getCommandHistory( character.id );

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
      "id": 1,
      "type": "test command",
      "undoCommandId": 2,
    },
    "next": LinkedListNode {
      "data": Object {
        "character": Character {
          "id": 12,
        },
        "data": Object {
          "more": "data",
        },
        "id": 3,
        "type": "second",
        "undoCommandId": 4,
      },
      "next": LinkedListNode {
        "data": Object {
          "character": Character {
            "id": 12,
          },
          "data": Object {},
          "id": 5,
          "type": "last test",
          "undoCommandId": 6,
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
      "id": 5,
      "type": "last test",
      "undoCommandId": 6,
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
        "id": 3,
        "type": "second",
        "undoCommandId": 4,
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
          "id": 1,
          "type": "test command",
          "undoCommandId": 2,
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

	describe( "addToHistory function", () => {
		it( "saves a given command to the database", async () => {
			expect.assertions( 2 );
			await commandHistoryService.addToHistory( command1 );
			expect( commandRepositoryMock.save ).toHaveBeenCalledWith( command1 );
			expect( commandRepositoryMock.save ).toHaveBeenCalledTimes( 1 );
		} );

		it( "removes the previously undone commands and their undo actions from the undo-stack", async () => {
			expect.assertions( 3 );
			commandRepositoryMock.find.mockResolvedValueOnce( [ command2 ] );

			await commandHistoryService.addToHistory( command3 );

			expect( commandRepositoryMock.find ).toHaveBeenCalledWith( {
				characterId: command3.character.id,
				undone: true,
			} );
			expect( commandRepositoryMock.delete ).toBeCalledTimes( 1 );
			expect( commandRepositoryMock.delete ).toBeCalledWith( [ 3, 4 ] );
		} );

		it( "removes nothing if there are no undone actions", async () => {
			expect.assertions( 1 );

			await commandHistoryService.addToHistory( command3 );

			expect( commandRepositoryMock.delete ).toBeCalledTimes( 0 );
		} );
	} );

	describe( "updateInHistory function", () => {
		it( "saves the state of a command", async () => {
			expect.assertions( 3 );
			commandRepositoryMock.save.mockResolvedValueOnce( "the command" as unknown as Command );

			const actual = await commandHistoryService.updateInHistory( command1 );

			expect( actual ).toBe( "the command" );
			expect( commandRepositoryMock.save ).toBeCalledTimes( 1 );
			expect( commandRepositoryMock.save ).toBeCalledWith( command1 );
		} );
	} );
} );
