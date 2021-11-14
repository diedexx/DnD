import Character from "../../domain/character/entities/Character.entity";
import InvalidCommand from "../exceptions/InvalidCommand.exception";
import CommandReference from "../interfaces/CommandReference.interface";
import { AbstractCommand } from "./AbstractCommand";

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
	let instance: CommandTestDouble;

	beforeEach( () => {
		instance = new CommandTestDouble( null );
	} );

	describe( "supports function", () => {
		it( "indicates support when the command type matches the argument", async () => {
			expect( instance.supports( "Not the type" ) ).toBeFalsy();
			expect( instance.supports( "Type" ) ).toBeTruthy();
		} );

		it( "is case insensitive", async () => {
			expect( instance.supports( "tYpE" ) ).toBeTruthy();
			expect( instance.supports( "TYPE" ) ).toBeTruthy();
			expect( instance.supports( "type" ) ).toBeTruthy();
		} );
	} );

	describe( "execute function", () => {
		it( "rejects invalid data", async () => {
			expect.assertions( 2 );
			const result = await instance.execute( { something: "is valid" }, new Character() );
			expect( result ).toStrictEqual( { success: true } );

			try {
				await instance.execute( { isValid: false }, new Character() );
			} catch ( e ) {
				expect( e ).toBeInstanceOf( InvalidCommand );
			}
		} );
	} );
} );
