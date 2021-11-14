import Character from "../../domain/character/entities/Character.entity";
import CommandReference from "../interfaces/CommandReference.interface";
import { NoopCommand } from "./NoopCommand";

describe( "The NoopCommand", () => {
	const instance = new NoopCommand( null );
	describe( "execute function", () => {
		it( "does nothing but return a reference to a new noopCommand", async () => {
			const expected: CommandReference = {
				data: { some: "unused-data" },
				type: "no-operation",
			};

			const actual = await instance.execute( { some: "unused-data" }, new Character() );
			expect( actual ).toStrictEqual( expected );
		} );
	} );
} );

