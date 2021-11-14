import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommandProviderService from "../../../command/CommandProvider.service";
import CommandReference from "../../../command/interfaces/CommandReference.interface";
import Character from "../entities/Character.entity";
import { SetTextFieldCommand, SetTextFieldData } from "./SetTextFieldCommand";
import Mocked = jest.Mocked;

describe( "The SetTextFieldCommand", () => {
	let setTextFieldCommand: SetTextFieldCommand;

	const characterRepositoryMock: Mocked<Partial<Repository<Character>>> = {
		findOne: jest.fn(),
		save: jest.fn().mockImplementation( ( x ) => x ),
	};

	const commandProviderServiceMock: Mocked<Partial<CommandProviderService>> = {
		registerCommand: jest.fn(),
	};

	beforeEach( async () => {
		const app: TestingModule = await Test.createTestingModule( {
			providers: [
				SetTextFieldCommand,
				{ provide: getRepositoryToken( Character ), useValue: characterRepositoryMock },
				{ provide: CommandProviderService, useValue: commandProviderServiceMock },
			],
		} ).compile();

		setTextFieldCommand = app.get<SetTextFieldCommand>( SetTextFieldCommand );
	} );

	describe( "execute function", () => {
		it( "Sets a new text field value and saves it", async () => {
			await setTextFieldCommand.execute(
				{
					field: "ideals",
					newText: "Something",
				},
				new Character(),
			);
			expect( characterRepositoryMock.save ).toHaveBeenCalledTimes( 1 );
			expect( characterRepositoryMock.save ).toHaveBeenCalledWith( Object.assign( new Character(), { ideals: "Something" } ) );
		} );

		it( "Returns a reference to a command to undo the action", async () => {
			const actual: CommandReference = await setTextFieldCommand.execute(
				{
					field: "ideals",
					newText: "Something else",
				},
				Object.assign( new Character(), { ideals: "Something" } ),
			);

			const expected: CommandReference<SetTextFieldData> = {
				type: "SET_TEXT_FIELD",
				data: {
					field: "ideals",
					newText: "Something",
				},
			};
			expect( actual ).toStrictEqual( expected );
		} );

		it( "restores an undefined value to an empty string in the undo action.", async () => {
			const actual: CommandReference = await setTextFieldCommand.execute(
				{
					field: "ideals",
					newText: "Something",
				},
				new Character(),
			);

			const expected: CommandReference<SetTextFieldData> = {
				type: "SET_TEXT_FIELD",
				data: {
					field: "ideals",
					newText: "",
				},
			};
			expect( actual ).toStrictEqual( expected );
		} );
	} );
} );
