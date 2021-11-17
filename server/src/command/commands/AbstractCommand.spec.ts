import { Test, TestingModule } from "@nestjs/testing";
import Character from "../../domain/character/entities/Character.entity";
import CommandProviderService from "../CommandProvider.service";
import InvalidCommand from "../exceptions/InvalidCommand.exception";
import CommandReference from "../interfaces/CommandReference.interface";
import { AbstractCommand } from "./AbstractCommand";
import Mocked = jest.Mocked;

class CommandTestDouble extends AbstractCommand {
	/**
	 * @inheritDoc
	 */
	public async getName(): Promise<string> {
		return "Name";
	}

	/**
	 * @inheritDoc
	 */
	public async getDescription(): Promise<string> {
		return "description";
	}

	/**
	 * @inheritDoc
	 */
	public getType(): string {
		return "Type";
	}

	/**
	 * @inheritDoc
	 */
	protected async perform(): Promise<CommandReference> {
		return { success: true } as unknown as CommandReference;
	}

	/**
	 * @inheritDoc
	 */
	protected validateData( data: Record<string, any> ): boolean {
		return data.isValid !== false;
	}
}

describe( "The AbstractCommand", () => {
	let commandInstance: CommandTestDouble;
	const commandProviderServiceMock: Partial<Mocked<CommandProviderService>> = {
		registerCommand: jest.fn(),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				CommandTestDouble,
				{ provide: CommandProviderService, useValue: commandProviderServiceMock },
			],
		} ).compile();

		commandInstance = app.get<CommandTestDouble>( CommandTestDouble );
	} );

	describe( "supports function", () => {
		it( "indicates support when the command type matches the argument", async () => {
			expect( commandInstance.supports( "Not the type" ) ).toBeFalsy();
			expect( commandInstance.supports( "Type" ) ).toBeTruthy();
		} );

		it( "is case insensitive", async () => {
			expect( commandInstance.supports( "tYpE" ) ).toBeTruthy();
			expect( commandInstance.supports( "TYPE" ) ).toBeTruthy();
			expect( commandInstance.supports( "type" ) ).toBeTruthy();
		} );
	} );

	describe( "execute function", () => {
		it( "rejects invalid data", async () => {
			expect.assertions( 2 );
			const result = await commandInstance.execute( { something: "is valid" }, new Character() );
			expect( result ).toStrictEqual( { success: true } );

			try {
				await commandInstance.execute( { isValid: false }, new Character() );
			} catch ( e ) {
				expect( e ).toBeInstanceOf( InvalidCommand );
			}
		} );
	} );

	describe( "onModuleInit function", () => {
		it( "registers itself", async () => {
			commandInstance.onModuleInit();
			expect( commandProviderServiceMock.registerCommand ).toBeCalledWith( commandInstance );
		} );
	} );
} );
