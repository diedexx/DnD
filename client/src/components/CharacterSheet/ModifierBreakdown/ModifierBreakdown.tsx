import { Fragment, FunctionComponent, useCallback } from "react";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import Table from "../../Table/Table";
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
		if ( modifier.externalModifiers && modifier.externalModifiers.length ) {
			return (
				<Fragment>
					<hr />
					External bonuses
					<Table
						defaultValue={ "" }
						headings={
							[
								{ field: "modifier.displayValue", name: "Bonus" },
								{ field: "source", name: "Source" },
								{ field: "description", name: "Description" },
							]
						}
						objects={ modifier.externalModifiers }
					/>
				</Fragment> );
		}
	}, [ modifier.externalModifiers ] );

	return <div className={ "modifier-breakdown card " + ( locked && "modifier-breakdown--locked" ) }>
		<table>
			<tbody>
				<tr>
					<td>Total:</td>
					<td>{ modifier.displayValue }</td>
				</tr>
				<tr>
					<td>Base:</td>
					<td>{ modifier.base }</td>
				</tr>
			</tbody>
		</table>
		{ listExternalModifiers() }
	</div>;
};

export default ModifierBreakdown;
