import { FunctionComponent, ReactNode } from "react";
import "./BigValueDisplay.css";

export type BigValueDisplayProps = {
	value?: string;
	children?: ReactNode;
}

/**
 * Displays a value in a large font.
 *
 * @param {string} value The value to display.
 * @param {ReactNode} children Any child components to render big.
 *
 * @return {JSX.Element} The component.
 */
const BigValueDisplay: FunctionComponent<BigValueDisplayProps> = (
	{
		value,
		children,
	}: BigValueDisplayProps ): JSX.Element => {
	return <div className="big-value-display">
		<span className="value">
			{ value }
			{ children }
		</span>
	</div>;
};

export default BigValueDisplay;
