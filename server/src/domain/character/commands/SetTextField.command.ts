import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { has, isString } from "lodash";
import { Repository } from "typeorm";
import CommandProviderService from "../../../infrastructure/command/CommandProvider.service";
import { AbstractCommand } from "../../../infrastructure/command/commands/AbstractCommand";
import CommandInterface from "../../../infrastructure/command/interfaces/Command.interface";
import CommandReference from "../../../infrastructure/command/interfaces/CommandReference.interface";
import Character from "../entities/Character.entity";

export const TYPE = "SET_TEXT_FIELD";

export interface SetTextFieldData {
	field: keyof Character | string;
	newText: string;
}

@Injectable()
export class SetTextFieldCommand extends AbstractCommand<SetTextFieldData> implements CommandInterface<SetTextFieldData> {
	/**
	 * The constructor.
	 *
	 * @param {Repository<Character>} characterRepository The character repo.
	 * @param {CommandProviderService} commandProviderService A service that provides commands.
	 */
	public constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
		commandProviderService: CommandProviderService,
	) {
		super( commandProviderService );
	}

	/**
	 * @inheritDoc
	 */
	public async getName( data: SetTextFieldData ): Promise<string> {
		return "Update " + data.field;
	}

	/**
	 * @inheritDoc
	 */
	public async getDescription( data: SetTextFieldData ): Promise<string> {
		return "Change " + data.field + " to \"" + data.newText + "\"";
	}

	/**
	 * @inheritDoc
	 */
	protected async perform( data: SetTextFieldData, character: Character ): Promise<CommandReference<SetTextFieldData>> {
		const oldText = character[ data.field ];

		Object.assign( character, { [ data.field ]: data.newText } );

		await this.characterRepository.save( character );

		return {
			type: this.getType(),
			data: { field: data.field, newText: oldText || "" },
		};
	}

	/**
	 * @inheritDoc
	 */
	protected validateData( data: SetTextFieldData, character: Character ): boolean {
		return ! ( has( character, data.field ) && ! isString( character[ data.field ] ) );
	}

	/**
	 * @inheritDoc
	 */
	public getType(): string {
		return TYPE;
	}
}
