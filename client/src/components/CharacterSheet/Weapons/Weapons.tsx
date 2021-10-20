import { FunctionComponent } from "react";
import ExternalModifierInterface from "../../../interfaces/ExternalModifier.interface";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import WeaponInterface from "../../../interfaces/Weapon.interface";
import Checkbox from "../../Checkbox/Checkbox";
import Table, { Heading } from "../../Table/Table";
import Tooltip from "../../Tooltip/Tooltip";
import ExternalModifierTable from "../ModifierBreakdown/ExternalModifierTable";
import ModifierDisplay from "../ModifierBreakdown/ModifierDisplay";

export type WeaponsProps = {
	weapons: WeaponInterface[];
}

const heading: Heading[] = [
	{
		name: "",
		renderer: ( weapon: WeaponInterface ) =>
			<Checkbox checked={ weapon.equipped } />,
	},
	{
		name: "Name",
		field: "name",
	},
	{
		name: "Attack bonus",
		field: "attackRollModifier",
		renderer: ( modifier: ModifierInterface ) =>
			<ModifierDisplay modifier={ modifier } />,
	},
	{
		name: "Damage",
		field: "damageRoll.displayValue",
	},
	{
		name: "Description",
		field: "description",
	},
	{
		name: "Bonuses",
		field: "bonuses",
		renderer: ( externalModifiers: ExternalModifierInterface[] ) => {
			if ( externalModifiers.length === 0 ) {
				return "-";
			}
			return <Tooltip handle="View">
				<ExternalModifierTable externalModifiers={ externalModifiers } isSource={ true } />
			</Tooltip>;
		},
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
	return <div className="weapons">
		<Table headings={ heading } objects={ weapons } />
	</div>;
};

export default Weapons;
