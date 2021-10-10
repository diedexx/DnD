import { Injectable } from "@nestjs/common";
import CannotCalculatePreparationLimit from "./exceptions/CannotCalculatePreparationLimit.exception";

export interface Rule {
	className: string;
	abilityName: string;
	levelMultiplier: number;
}

@Injectable()
export default class AbilityPlusLevelLimiterRules {
	/**
	 * Gets the limiter rules for a classname.
	 *
	 * @param {string} characterClassName The classname to find rules for.
	 *
	 * @return {Rule} The rule.
	 */
	public getRule( characterClassName: string ): Rule {
		const foundRule = this.getRules().find( ( rule: Rule ) => rule.className === characterClassName );
		if ( ! foundRule ) {
			throw CannotCalculatePreparationLimit.becauseNoClassRules( characterClassName );
		}
		return foundRule;
	}

	/**
	 * Gets all known rules.
	 *
	 * @return {Rule[]} The rules.
	 *
	 * @protected
	 */
	protected getRules(): Rule[] {
		return [
			{ className: "Wizard", abilityName: "Intelligence", levelMultiplier: 1 },
			{ className: "Cleric", abilityName: "Wisdom", levelMultiplier: 1 },
			{ className: "Druid", abilityName: "Wisdom", levelMultiplier: 1 },
			{ className: "Paladin", abilityName: "Charisma", levelMultiplier: 0.5 },
		];
	}
}
