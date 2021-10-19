import { FunctionComponent } from "react";
import AbilityScoreInterface from "../../../interfaces/AbilityScore.interface";
import AbilityScore from "./AbilityScore";

export type AbilityScoresProps = {
	abilityScores: AbilityScoreInterface[];
}

/**
 * Lists all abilities and their scores.
 *
 * @param {AbilityScoreInterface[]} abilityScores The ability scores to list.
 *
 * @return {JSX.Element} The list of abilities and their scores.
 */
const AbilityScores: FunctionComponent<AbilityScoresProps> = ( { abilityScores } ): JSX.Element => {
	return <div className="ability-scores">
		{ abilityScores.map( renderAbilityScore ) }
	</div>;
};

/**
 * Gets an AbilityScore component for an abilityScore object.
 *
 * @param {AbilityScore} abilityScore The AbilityScore object.
 *
 * @return {JSX.Element} The AbilityScore component.
 */
function renderAbilityScore( abilityScore: AbilityScoreInterface ) {
	return <AbilityScore key={ abilityScore.ability.name } abilityScore={ abilityScore } />;
}

export default AbilityScores;
