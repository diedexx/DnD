import { FunctionComponent, ReactNode } from "react";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import Tooltip from "../../Common/Tooltip/Tooltip";
import ModifierBreakdown from "./ModifierBreakdown";

export type ModifierBreakdownTooltipProps = {
	modifier: ModifierInterface;
	children: ReactNode;
}

/**
 * Renders a component which shows a ModifierBreakdown as a tooltip on hover.
 * @param {ModifierInterface} modifier The modifier to show.
 * @param {ReactNode} children A child component which will trigger showing the breakdown on hover.
 *
 * @return {JSX.Element} The breakdown tooltip.
 */
const ModifierBreakdownTooltip: FunctionComponent<ModifierBreakdownTooltipProps> =
	( { modifier, children }: ModifierBreakdownTooltipProps ): JSX.Element => {
		return <Tooltip handle={ children }>
			<ModifierBreakdown modifier={ modifier } />
		</Tooltip>;
	};

export default ModifierBreakdownTooltip;
