import { FunctionComponent } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./Bar.css";

export type BarProps = {
	readonly progress: number;
	readonly limit: number;
}

/**
 * Displays a progress bar.
 *
 * @param {number} limit The bar's limit.
 * @param {number} progress The progress.
 *
 * @return {JSX.Element} The component.
 */
const Bar: FunctionComponent<BarProps> = ( { limit, progress }: BarProps ): JSX.Element => {
	const elements = [];
	for ( let i = 0; i < limit; i++ ) {
		const spent = progress > i;
		elements.push( <Checkbox checked={ spent } key={ i } /> );
	}
	return <div className="bar">{ elements }</div>;
};

export default Bar;
