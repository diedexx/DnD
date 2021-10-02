import { FunctionComponent } from "react";
import SkillScoreInterface from "../../../interfaces/SkillScore.interface";
import SkillScore from "./SkillScore";
import "./SkillScores.css";

export type SkillScoresProps = {
	skillScores: SkillScoreInterface[];
}

/**
 * Lists all skills and their scores.
 *
 * @param {SkillScoreInterface[]} skillScores The skill scores to list.
 *
 * @return {JSX.Element} The list of skills and their scores.
 */
const SkillScores: FunctionComponent<SkillScoresProps> = ( { skillScores } ): JSX.Element => {
	return <div className="skill-scores card">
		{ skillScores.map( renderSkillScore ) }
	</div>;
};

/**
 * Gets an SkillScore component for an skillScore object.
 *
 *  @param {SkillScore} skillScore The SkillScore object.
 *
 * @return {JSX.Element} The SkillScore component.
 */
function renderSkillScore( skillScore: SkillScoreInterface ) {
	return <SkillScore key={ skillScore.skill.name } skillScore={ skillScore } />;
}

export default SkillScores;
