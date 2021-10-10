import { Injectable } from "@nestjs/common";
import Character from "../../character/entities/Character.entity";
import CannotCalculatePreparationLimit from "./exceptions/CannotCalculatePreparationLimit.exception";
import PreparationLimiterInterface from "./PreparationLimiter.interface";

@Injectable()
export default class UnlimitedPreparationLimiter implements PreparationLimiterInterface {
	/**
	 * @inheritdoc
	 */
	public async getPreparationLimit( character: Character ): Promise<number> {
		throw CannotCalculatePreparationLimit.becauseUnlimited( character.class.name );
	}

	/**
	 * @inheritDoc
	 */
	public async supports(): Promise<boolean> {
		return true;
	}
}
