import { FunctionComponent, ReactNode } from "react";

export type ControlGroupProps = {
	children: ReactNode;
}

/**
 * A grouped collection of controls.
 *
 * @param {ReactNode} children The components to group.
 *
 * @return {JSX.Element} The group
 */
const ControlGroup: FunctionComponent<ControlGroupProps> = ( { children }: ControlGroupProps ): JSX.Element => {
	return <div className="controls controls--group">{ children }</div>;
};

export default ControlGroup;
