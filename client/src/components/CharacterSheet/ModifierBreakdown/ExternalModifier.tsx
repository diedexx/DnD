import { FunctionComponent } from "react";
import getModifierColor from "../../../functions/modifierColor";
import ExternalModifierInterface from "../../../interfaces/ExternalModifier.interface";
import "./ExternalModifier.css";

export type ExternalModifierProps = {
	externalModifier: ExternalModifierInterface
}

/**
 * Gets a external modifier display with a matching color.
 *
 * @param {ExternalModifierInterface} externalModifier The external modifier to display.
 *
 * @return {JSX.Element} The external modifier with a matching color.
 */
const ExternalModifier: FunctionComponent<ExternalModifierProps> = ( { externalModifier }: ExternalModifierProps ): JSX.Element => {
	const situationalClassName = ( externalModifier.situational && " external-modifier--situational" );
	return <span
		className={ [ "external-modifier", situationalClassName ].join( " " ) }
		style={ { color: getModifierColor( externalModifier ) } }
	>
		{ externalModifier.modifier.displayValue }
	</span>;
};

export default ExternalModifier;
