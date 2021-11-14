import { Fragment, FunctionComponent } from "react";
import SkillScoreInterface from "../../../interfaces/SkillScore.interface";
import Checkbox from "../../Common/Checkbox/Checkbox";
import ModifierBreakdownTooltip from "../ModifierBreakdown/ModifierBreakdownTooltip";
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
	return <Fragment>
		<div className="skill-score">
			<Checkbox checked={ skillScore.isProficient } />
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
