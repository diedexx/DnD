import { Injectable } from "@nestjs/common";
import Character from "../character/entities/Character.entity";
import PreparationLimiterFactory from "./preparation/PreparationLimiter.factory";

@Injectable()
export class SpellService {
	/**
	 * The constructor.
	 */
	public constructor( private readonly preparationLimiterFactory: PreparationLimiterFactory ) {
	}

	/**
	 * Gets the preparation limit for a character.
	 *
	 * @param {Character} character The character.
	 *
	 * @return {Promise<number>} The limit of prepared spells.
	 */
	public async getPreparationLimit( character: Character ): Promise<number> {
		const limiter = await this.preparationLimiterFactory.getPreparationLimiter( character );
		return await limiter.getPreparationLimit( character );
	}
}
