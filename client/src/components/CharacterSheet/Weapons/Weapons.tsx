import { FunctionComponent } from "react";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import WeaponInterface from "../../../interfaces/Weapon.interface";
import Table, { Heading } from "../../Table/Table";
import WeaponAttackModifier from "./WeaponAttackModifier";
import "./Weapons.css";

export type WeaponsProps = {
	weapons: WeaponInterface[];
}

const heading: Heading[] = [
	{
		name: "Name",
		field: "name",
	},
	{
		name: "Attack bonus",
		field: "attackRollModifier",
		renderer: ( ( modifier: ModifierInterface ) => <WeaponAttackModifier modifier={ modifier } /> ),
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
 * @param {WeaponInterface[]} weapons The weapons to list.
 *
 * @return {JSX.Element} The list of weapons and their properties.
 */
const Weapons: FunctionComponent<WeaponsProps> = ( { weapons } ): JSX.Element => {
	return <div className="weapons card">
		<Table defaultValue="-" headings={ heading } objects={ weapons } />
	</div>;
};

export default Weapons;
