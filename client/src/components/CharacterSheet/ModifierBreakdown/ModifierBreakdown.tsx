import { Fragment, FunctionComponent, useCallback } from "react";
import ExternalModifierInterface from "../../../interfaces/ExternalModifier.interface";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import Table from "../../Table/Table";
import ExternalModifier from "./ExternalModifier";
import "./ModifierBreakdown.css";

export type ModifierBreakdownProps = {
	modifier: ModifierInterface,
	locked: boolean;
}

/**
 * Renders a breakdown of how a modifier is built up.
 *
 * @param {ModifierInterface} modifier The modifier to explain.
 * @param {boolean} locked Whether the modifier breakdown is locked on the screen.
 *
 * @return {JSX.Element} The modifier breakdown component.
 */
const ModifierBreakdown: FunctionComponent<ModifierBreakdownProps> = ( { modifier, locked } ): JSX.Element => {
	const listExternalModifiers = useCallback( () => {
		if ( ! ( modifier.externalModifiers && modifier.externalModifiers.length ) ) {
			return null;
		}
		return (
			<Fragment>
				<Table
					headings={
						[
							{
								name: "Bonus",
								renderer: ( externalModifier: ExternalModifierInterface ) =>
									<ExternalModifier externalModifier={ externalModifier } />,
							},
							{
								field: "source",
								name: "Source",
							},
							{
								field: "description",
								name: "Description",
							},
						]
					}
					objects={ modifier.externalModifiers }
				/>
			</Fragment> );
	}, [ modifier.externalModifiers ] );

	if ( ! ( modifier.externalModifiers && modifier.externalModifiers.length ) ) {
		return <div className={ "modifier-breakdown card " + ( locked && "modifier-breakdown--locked" ) }>
			No bonuses
		</div>;
	}

	return <div className={ "modifier-breakdown card " + ( locked && "modifier-breakdown--locked" ) }>
		<div className={ "modifier-breakdown__summary" }>
			{ modifier.displayBaseValue }
			{ modifier.externalModifiers.map( externalModifier =>
				<ExternalModifier key={ externalModifier.source } externalModifier={ externalModifier } />,
			) }
		</div>
		<hr />
		{ listExternalModifiers() }
	</div>;
};

export default ModifierBreakdown;
