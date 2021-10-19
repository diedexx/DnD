import { FunctionComponent } from "react";
import ExternalModifierInterface from "../../../interfaces/ExternalModifier.interface";
import Table from "../../Table/Table";
import ExternalModifier from "./ExternalModifier";

export type ExternalModifierTableProps = {
	externalModifiers: ExternalModifierInterface[],
}

/**
 * Renders a table displaying a list of external modifiers.
 *
 * @param {ExternalModifierInterface[]} externalModifiers The external modifiers.
 *
 * @return {JSX.Element} The table.
 */
const ExternalModifierTable: FunctionComponent<ExternalModifierTableProps> = ( { externalModifiers }: ExternalModifierTableProps ): JSX.Element => {
	if ( externalModifiers.length === 0 ) {
		return null;
	}
	return <Table
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
		objects={ externalModifiers }
	/>;
};

export default ExternalModifierTable;
