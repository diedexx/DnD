import { InjectRepository } from "@nestjs/typeorm";
import { has, isString } from "lodash";
import { Repository } from "typeorm";
import Character from "../../domain/character/entities/Character.entity";
import CommandInterface from "../interfaces/Command.interface";
import CommandReference from "../interfaces/CommandReference.interface";
import { AbstractCommand } from "./AbstractCommand";

export const TYPE = "SET_TEXT_FIELD";

export interface SetTextFieldData {
	field: keyof Character | string;
	newText: string;
}

export class SetTextFieldCommand extends AbstractCommand<SetTextFieldData> implements CommandInterface<SetTextFieldData> {
	/**
	 * The constructor.
	 */
	public constructor(
		@InjectRepository( Character )
		private readonly characterRepository: Repository<Character>,
	) {
		super();
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
		return "Change \"" + data.field + "\" to \"" + data.newText + "\"";
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
