import { FunctionComponent } from "react";
import EquipmentInterface from "../../../interfaces/Equipment.interface";
import Checkbox from "../../Checkbox/Checkbox";
import Table, { Heading } from "../../Table/Table";

export type EquipmentProps = {
	equipment: EquipmentInterface[];
}
/**
 * Renders a checkbox that displays if the item is equipped if it's equippable.
 *
 * @param {EquipmentInterface} item The item.
 *
 * @return {JSX.Element | null} The checkbox or nothing.
 */
const equipCheckbox = ( item: EquipmentInterface ) => {
	if ( ! item.equippable ) {
		return null;
	}
	return <Checkbox checked={ item.equipped } />;
};

const headings: Heading[] = [
	{ name: "", renderer: equipCheckbox },
	{ name: "Name", field: "name" },
	{ name: "Description", field: "description" },
	{ name: "Owned", field: "number" },
];

/**
 * Displays a list of equipment items.
 *
 * @param {EquipmentInterface[]} equipment The equipment to show.
 *
 * @return {JSX.Element} The component.
 */
const Equipment: FunctionComponent<EquipmentProps> = ( { equipment }: EquipmentProps ): JSX.Element => {
	return <div className="equipment">
		<Table headings={ headings } objects={ equipment } />
	</div>;
};

export default Equipment;
