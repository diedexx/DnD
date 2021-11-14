import { Test, TestingModule } from "@nestjs/testing";
import CommandProviderService from "./CommandProvider.service";
import CommandInterface from "./interfaces/Command.interface";
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
				{ provide: "FallbackCommand", useValue: fallbackCommand },
			],
		} ).compile();

		commandProviderService = app.get<CommandProviderService>( CommandProviderService );
		commandProviderService.registerCommand( command1 as CommandInterface );
		commandProviderService.registerCommand( command2 as CommandInterface );
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
