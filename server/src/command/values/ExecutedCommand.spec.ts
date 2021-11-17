import Command from "../entities/Command.entity";
import InvalidExecutedCommand from "../exceptions/InvalidExecutedCommand.exception";
import { ExecutedCommand } from "./ExecutedCommand";

describe( "The ExecutedCommand class", () => {
	describe( "constructor", () => {
		it( "combines a command, a name and a description", () => {
			const command = new Command();
			command.executedAt = new Date( "2021-01-01 12:30:00Z" );
			const instance = new ExecutedCommand( command, "test command", "a command for testing" );
			expect( instance ).toMatchInlineSnapshot( `
ExecutedCommand {
  "command": Command {
    "executedAt": 2021-01-01T12:30:00.000Z,
  },
  "description": "a command for testing",
  "name": "test command",
}
` );
		} );
		it( "cannot represent a commands that haven't been executed", () => {
			expect( () => {
				new ExecutedCommand( new Command(), "test command", "a command for testing" );
			} ).toThrow( InvalidExecutedCommand );
		} );
	} );
	describe( "isUndone function", () => {
		it.each( [ true, false ] )( "returns whether the command was undone (%d)", ( isUndone ) => {
			const command = new Command();
			command.executedAt = new Date( "2021-01-01 12:30:00Z" );
			command.undone = isUndone;
			const instance = new ExecutedCommand( command, "test command", "a command for testing" );
			expect( instance.isUndone ).toBe( isUndone );
		} );
	} );

	describe( "executedAt function", () => {
		it( "returns the moment on which the command was executed", async () => {
			const command = new Command();
			command.executedAt = new Date( "2021-01-01 12:30:00Z" );
			const instance = new ExecutedCommand( command, "test command", "a command for testing" );
			expect( instance.executedAt ).toStrictEqual( new Date( "2021-01-01 12:30:00Z" ) );
		} );
	} );
} );
