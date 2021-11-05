import { FunctionComponent, ReactNode } from "react";
import "./Controls.css";

export type controlsProps = {
	children: ReactNode;
}

/**
 * A combination of controls.
 *
 * @param {ReactNode} children The controls.
 *
 * @return {JSX.Element} The controls component.
 */
const Controls: FunctionComponent<controlsProps> = ( { children }: controlsProps ): JSX.Element => {
	return <div className="controls">{ children }</div>;
};

export default Controls;

