import { FunctionComponent } from "react";
import "./Checkbox.css";

export type CheckboxProps = {
	checked: boolean
}

/**
 * Renders a checkbox.
 *
 * @param {boolean} checked Whether the checkbox is checked.
 *
 * @return {JSX.Element} The checkbox.
 */
const Checkbox: FunctionComponent<CheckboxProps> = ( { checked }: CheckboxProps ): JSX.Element => {
	return <div className={ "checkbox " }>
		{ checked && <div className="checkbox__check" /> }
	</div>;
};

export default Checkbox;
