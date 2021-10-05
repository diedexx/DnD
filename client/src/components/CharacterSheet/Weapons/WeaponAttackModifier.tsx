import { Fragment, FunctionComponent } from "react";
import ExternalModifierInterface from "../../../interfaces/ExternalModifier.interface";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import ModifierBreakdownTooltip from "../ModifierBreakdown/ModifierBreakdownTooltip";
import "./WeaponAttackModifier.css";

export type WeaponAttackValueProps = {
	modifier: ModifierInterface
}

/**
 * Displays the attack roll modifier of a weapon.
 *
 * @param {ModifierInterface} modifier The modifier.
 *
 * @return {JSX.Element} The component.
 */
const WeaponAttackModifier: FunctionComponent<WeaponAttackValueProps> = ( { modifier }: WeaponAttackValueProps ): JSX.Element => {
	const hasSituationalModifiers = modifier.externalModifiers.some(
		( externalModifier: ExternalModifierInterface ) => externalModifier.situational,
	);
	return <ModifierBreakdownTooltip modifier={ modifier }>
		<Fragment>
			<span>{ modifier.displayValue }</span>
			{ hasSituationalModifiers && <sup className="weapon-attack-modifier__situational_marker">*</sup> }
		</Fragment>
	</ModifierBreakdownTooltip>;
};

export default WeaponAttackModifier;
