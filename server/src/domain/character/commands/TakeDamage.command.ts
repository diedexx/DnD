import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import CommandProviderService from "../../../infrastructure/command/CommandProvider.service";
import { AbstractCommand } from "../../../infrastructure/command/commands/AbstractCommand";
import CommandReference from "../../../infrastructure/command/interfaces/CommandReference.interface";
import Character from "../entities/Character.entity";
import { ReceiveHealingCommandData, TYPE as receiveHealingCommandType } from "./ReceiveHealing.command";

export type TakeDamageCommandData = {
	damage: number;
}

export const TYPE = "TAKE_DAMAGE";

export default class TakeDamageCommand extends AbstractCommand<TakeDamageCommandData> {
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
	public async getDescription( data: TakeDamageCommandData, character: Character ): Promise<string> {
		return character.name + " took " + data.damage + " damage.";
	}

	/**
	 * @inheritDoc
	 */
	public async getName(): Promise<string> {
		return "Damage";
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
	protected async perform( data: TakeDamageCommandData, character: Character ): Promise<CommandReference> {
		const beforeHealth = character.health.currentHealth;
		character.health = character.health.takeDamage( data.damage );
		await this.characterRepository.save( character );
		return {
			type: receiveHealingCommandType,
			data: { healing: beforeHealth - character.health.currentHealth } as ReceiveHealingCommandData,
		};
	}

	/**
	 * @inheritDoc
	 */
	protected validateData( data: TakeDamageCommandData ): boolean {
		return data.damage > 0 && Number.isInteger( data.damage );
	}
}
