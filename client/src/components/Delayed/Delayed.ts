import { ReactElement, useEffect, useState } from "react";

type DelayedPros = {
	children: ReactElement;
	waitBeforeShow?: number;
};

/**
 * Shows a child component after a short delay.
 *
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} children The component to show.
 * @param {number | undefined} waitBeforeShow The number of ms to wait before showing.
 *
 * @return {React.ReactElement<any, string | React.JSXElementConstructor<any>>} The delayed component.
 */
const Delayed = ( { children, waitBeforeShow = 500 }: DelayedPros ) => {
	const [ isShown, setIsShown ] = useState( false );

	useEffect( () => {
		setTimeout( () => setIsShown( true ), waitBeforeShow );
	}, [ waitBeforeShow ] );

	return isShown ? children : null;
};

export default Delayed;
