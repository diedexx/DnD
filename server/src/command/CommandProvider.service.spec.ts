import { Test, TestingModule } from "@nestjs/testing";
import CommandInterface from "./interfaces/Command.interface";
import CommandProviderService from "./CommandProvider.service";
import { NoopCommand } from "./commands/NoopCommand";
import Mocked = jest.Mocked;

describe( "The CommandProviderService", () => {
	let commandProviderService: CommandProviderService;

	const command1: Partial<Mocked<CommandInterface>> = {
		supports: jest.fn().mockReturnValue( false ),
	};

	const command2: Partial<Mocked<CommandInterface>> = {
		supports: jest.fn().mockReturnValue( false ),
	};

	const fallbackCommand: Partial<Mocked<CommandInterface>> = {
		supports: jest.fn().mockReturnValue( false ),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				CommandProviderService,
				{ provide: NoopCommand, useValue: fallbackCommand },
				{ provide: "COMMANDS", useValue: [ command1, command2 ] },
			],
		} ).compile();

		commandProviderService = app.get<CommandProviderService>( CommandProviderService );
	} );

	describe( "getCommand function", () => {
		it( "Gets the first command that supports the command type", async () => {
			command2.supports.mockReturnValueOnce( true );
			const actual = commandProviderService.getCommand( "test type" );

			expect( command2.supports ).toBeCalledTimes( 1 );
			expect( command2.supports ).toBeCalledWith( "test type" );
			expect( actual ).toBe( command2 );
		} );

		it( "Gets the first command with the matching type", async () => {
			const actual = commandProviderService.getCommand( "unknown type" );
			expect( actual ).toBe( fallbackCommand );
		} );
	} );
} );
