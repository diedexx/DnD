import { FunctionComponent } from "react";
import AbilityScoreInterface from "../../../interfaces/AbilityScore";
import "./AbilityScore.css";

export type AbilitiesProps = {
	abilityScore: AbilityScoreInterface;
}

/**
 * An ability score
 *
 * @return {JSX.Element} An ability score.
 */
const AbilityScore: FunctionComponent<AbilitiesProps> = ( { abilityScore }: AbilitiesProps ): JSX.Element => {
	return <div className="ability-score">
		<div className="ability-score__name">{ abilityScore.ability.name }</div>
		<div className="ability-score__modifier">{ abilityScore.modifier.value }</div>
		<div className="ability-score__baseScore">{ abilityScore.baseScore }</div>
	</div>;
};

export default AbilityScore;
