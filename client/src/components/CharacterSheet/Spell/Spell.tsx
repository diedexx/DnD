import { FunctionComponent } from "react";
import SpellInterface from "../../../interfaces/Spell.interface";
import Checkbox from "../../Checkbox/Checkbox";
import Table, { Heading } from "../../Table/Table";

export type SpellsProps = {
	spells: SpellInterface[];
}

const heading: Heading[] = [
	{
		name: "",
		renderer: ( spell: SpellInterface ) => <Checkbox checked={ spell.prepared } />,
	},
	{
		name: "Name",
		field: "name",
	},
	{
		name: "Damage",
		field: "damageRoll.displayValue",
	},
	{
		name: "Description",
		field: "description",
	},
];

/**
 * Lists all weapons and their properties.
 *
 * @param {SpellInterface[]} weapons The weapons to list.
 *
 * @return {JSX.Element} The list of weapons and their properties.
 */
const Spells: FunctionComponent<SpellsProps> = ( { spells } ): JSX.Element => {
	return <div className="spells">
		<Table headings={ heading } objects={ spells } />
	</div>;
};

export default Spells;
