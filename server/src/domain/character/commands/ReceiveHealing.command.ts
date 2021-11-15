import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommandProviderService from "../../../command/CommandProvider.service";
import { AbstractCommand } from "../../../command/commands/AbstractCommand";
import CommandReference from "../../../command/interfaces/CommandReference.interface";
import Character from "../entities/Character.entity";
import { TakeDamageCommandData, TYPE as takeDamageCommandType } from "./TakeDamage.command";

export type ReceiveHealingCommandData = {
	healing: number;
}

export const TYPE = "RECEIVE_HEALING";

export default class ReceiveHealingCommand extends AbstractCommand<ReceiveHealingCommandData> {
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
	public async getDescription( data: ReceiveHealingCommandData, character: Character ): Promise<string> {
		return character.name + " was healed for " + data.healing + " HP.";
	}

	/**
	 * @inheritDoc
	 */
	public async getName(): Promise<string> {
		return "Heal";
	}

	/**
	 * @inheritDoc
	 */
	public getType(): string {
		return TYPE;
	}

	/**
	 * @inheritDoc
	 */
	protected async perform( data: ReceiveHealingCommandData, character: Character ): Promise<CommandReference> {
		const beforeHealth = character.health.currentHealth;
		character.health = character.health.heal( data.healing );
		await this.characterRepository.save( character );
		return {
			type: takeDamageCommandType,
			data: { damage: character.health.currentHealth - beforeHealth } as TakeDamageCommandData,
		};
	}

	/**
	 * @inheritDoc
	 */
	protected validateData( data: ReceiveHealingCommandData ): boolean {
		return data.healing > 0 && Number.isInteger( data.healing );
	}
}
