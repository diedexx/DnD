import { Fragment, FunctionComponent } from "react";
import ExternalModifierInterface from "../../../interfaces/ExternalModifier.interface";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import ModifierBreakdownTooltip from "./ModifierBreakdownTooltip";
import "./ModifierDisplay.css";

export type ModifierDisplayProps = {
	modifier: ModifierInterface
}

/**
 * Displays a modifier with a situational-indicator.
 *
 * @param {ModifierInterface} modifier The modifier.
 *
 * @return {JSX.Element} The component.
 */
const ModifierDisplay: FunctionComponent<ModifierDisplayProps> = ( { modifier }: ModifierDisplayProps ): JSX.Element => {
	const hasSituationalModifiers = modifier.externalModifiers.some(
		( externalModifier: ExternalModifierInterface ) => externalModifier.situational,
	);
	return <ModifierBreakdownTooltip modifier={ modifier }>
		<Fragment>
			<span>{ modifier.displayValue }</span>
			{ hasSituationalModifiers && <sup className="modifier_display__situational_marker">+</sup> }
		</Fragment>
	</ModifierBreakdownTooltip>;
};

export default ModifierDisplay;
