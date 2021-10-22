import { FunctionComponent } from "react";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import ExternalModifier from "./ExternalModifier";
import ExternalModifierTable from "./ExternalModifierTable";
import "./ModifierBreakdown.css";

export type ModifierBreakdownProps = {
	modifier: ModifierInterface,
}

/**
 * Renders a breakdown of how a modifier is built up.
 *
 * @param {ModifierInterface} modifier The modifier to explain.
 *
 * @return {JSX.Element} The modifier breakdown component.
 */
const ModifierBreakdown: FunctionComponent<ModifierBreakdownProps> = ( { modifier } ): JSX.Element => {
	if ( ! ( modifier.externalModifiers && modifier.externalModifiers.length ) ) {
		return <div className="modifier-breakdown">
			No bonuses
		</div>;
	}

	return <div className="modifier-breakdown">
		<div className={ "modifier-breakdown__summary" }>
			{ modifier.base > 0 && modifier.displayBaseValue }
			{ modifier.externalModifiers.map( externalModifier =>
				<ExternalModifier
					key={ externalModifier.source + externalModifier.modifier.value }
					externalModifier={ externalModifier }
				/>,
			) }
		</div>
		<hr />
		<ExternalModifierTable externalModifiers={ modifier.externalModifiers } />
	</div>;
};

export default ModifierBreakdown;
