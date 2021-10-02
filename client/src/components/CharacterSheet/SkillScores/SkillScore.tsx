import { Fragment, FunctionComponent } from "react";
import SkillScoreInterface from "../../../interfaces/SkillScore.interface";
import "./SkillScore.css";
import ModifierBreakdownTooltip from "../ModifierBreakdown/ModifierBreakdownTooltip";

export type SkillScoreProps = {
	skillScore: SkillScoreInterface;
}

/**
 * A skill score.
 *
 * @return {JSX.Element} An ability score.
 */
const SkillScore: FunctionComponent<SkillScoreProps> = ( { skillScore }: SkillScoreProps ): JSX.Element => {
	return <Fragment>
		<div className="skill-score">
			<span
				className={ "skill_score__proficiency " + ( skillScore.isProficient && "skill_score__proficiency--proficient" ) }
			>
				{ skillScore.isProficient && "✓" }
			</span>
			<ModifierBreakdownTooltip modifier={ skillScore.modifier }>
				<span className="skill-score__modifier">{ skillScore.modifier.displayValue }</span>
			</ModifierBreakdownTooltip>
			<span className="skill-score__name">{ skillScore.skill.name }
				&nbsp;
				<span className="skill-score__ability-source">
					({ skillScore.skill.ability.shortName })
				</span>
			</span>

		</div>

	</Fragment>;
};

export default SkillScore;
