import { Fragment, FunctionComponent } from "react";
import SavingThrowInterface from "../../../interfaces/SavingThrow.interface";
import Checkbox from "../../Common/Checkbox/Checkbox";
import ModifierBreakdownTooltip from "../ModifierBreakdown/ModifierBreakdownTooltip";
import "./SavingThrow.css";

export type SavingThrowProps = {
	savingThrow: SavingThrowInterface;
}

/**
 * A saving throw.
 *
 * @return {JSX.Element} An ability score.
 */
const SavingThrow: FunctionComponent<SavingThrowProps> = ( { savingThrow }: SavingThrowProps ): JSX.Element => {
	return <Fragment>
		<div className="saving-throw">
			<Checkbox checked={ savingThrow.isProficient } />
			<ModifierBreakdownTooltip modifier={ savingThrow.modifier }>
				<span className="saving-throw__modifier">{ savingThrow.modifier.displayValue }</span>
			</ModifierBreakdownTooltip>
			<span className="saving-throw__name">{ savingThrow.ability.name }</span>

		</div>

	</Fragment>;
};

export default SavingThrow;
