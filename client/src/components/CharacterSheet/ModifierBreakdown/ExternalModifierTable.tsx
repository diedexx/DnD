import { FunctionComponent } from "react";
import ExternalModifierInterface from "../../../interfaces/ExternalModifier.interface";
import Table from "../../Common/Table/Table";
import ExternalModifier from "./ExternalModifier";

export type ExternalModifierTableProps = {
	externalModifiers: ExternalModifierInterface[],
	isSource?: boolean;
}

const headings = [
	{
		name: "Bonus",
		renderer: ( externalModifier: ExternalModifierInterface ) =>
			<ExternalModifier externalModifier={ externalModifier } />,
	},
	{
		field: "description",
		name: "Description",
	},
	{
		field: "source",
		name: "Source",
	},
];

const sourceHeadings = [
	{
		name: "Bonus",
		renderer: ( externalModifier: ExternalModifierInterface ) =>
			<ExternalModifier externalModifier={ externalModifier } />,
	},
	{
		field: "type",
		name: "To",
	},
	{
		field: "description",
		name: "Description",
	},
];

/**
 * Renders a table displaying a list of external modifiers.
 *
 * @param {ExternalModifierInterface[]} externalModifiers The external modifiers.
 * @param {boolean} isSource Is the modifier shown for the source or for the receiver.
 *
 * @return {JSX.Element} The component.
 */
const ExternalModifierTable: FunctionComponent<ExternalModifierTableProps> = (
	{ externalModifiers, isSource }: ExternalModifierTableProps ): JSX.Element => {
	if ( externalModifiers.length === 0 ) {
		return null;
	}
	return <Table
		headings={ isSource ? sourceHeadings : headings }
		objects={ externalModifiers }
	/>;
};

ExternalModifierTable.defaultProps = {
	isSource: false,
};

export default ExternalModifierTable;
