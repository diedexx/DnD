import { FunctionComponent } from "react";
import SkillScoreInterface from "../../../interfaces/SkillScore.interface";
import "./SkillScore.css";

export type SkillScoreProps = {
	skillScore: SkillScoreInterface;
}

/**
 * A skill score.
 *
 * @return {JSX.Element} An ability score.
 */
const SkillScore: FunctionComponent<SkillScoreProps> = ( { skillScore }: SkillScoreProps ): JSX.Element => {
	return <div className="skill-score">
		<span className="skill-score__modifier">{ skillScore.modifier.displayValue }</span>
		<span className="skill-score__name">{ skillScore.skill.name }
			&nbsp;
			<span className="skill-score__ability-source">
				({ skillScore.skill.ability.shortName })
			</span>
		</span>
	</div>;
};

export default SkillScore;
