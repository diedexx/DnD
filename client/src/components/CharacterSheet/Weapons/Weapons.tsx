import { FunctionComponent } from "react";
import WeaponInterface from "../../../interfaces/Weapon.interface";
import Table, { Heading } from "../../Table/Table";
import "./Weapons.css";

export type WeaponsProps = {
	weapons: WeaponInterface[];
}

const heading: Heading[] = [
	{ name: "name", field: "name" },
	{ name: "Atk bonus", field: "attackRollModifier.displayValue" },
	{ name: "Dmg", field: "damageRoll.modifier.displayValue" },
	{ name: "description", field: "description" },
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
