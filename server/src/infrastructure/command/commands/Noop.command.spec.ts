import Character from "../../../domain/character/entities/Character.entity";
import CommandReference from "../interfaces/CommandReference.interface";
import { NoopCommand } from "./Noop.command";

describe( "The NoopCommand", () => {
	const noopCommand = new NoopCommand( null );

	describe( "getName function", () => {
		it( "describes the event", async () => {
			const actual = await noopCommand.getName();
			expect( actual ).toMatchInlineSnapshot( "\"Nothing\"" );
		} );
	} );

	describe( "getDescription function", () => {
		it( "describes the event in more detail", async () => {
			const actual = await noopCommand.getDescription();
			expect( actual ).toMatchInlineSnapshot( "\"...\"" );
		} );
	} );
	describe( "getType function", () => {
		it( "describes the type of event", async () => {
			const actual = noopCommand.getType();
			expect( actual ).toMatchInlineSnapshot( "\"no-operation\"" );
		} );
	} );

	describe( "execute function", () => {
		it( "does nothing but return a reference to a new noopCommand", async () => {
			const expected: CommandReference = {
				data: { some: "unused-data" },
				type: "no-operation",
			};

			const actual = await noopCommand.execute( { some: "unused-data" }, new Character() );
			expect( actual ).toStrictEqual( expected );
		} );
	} );
} );

