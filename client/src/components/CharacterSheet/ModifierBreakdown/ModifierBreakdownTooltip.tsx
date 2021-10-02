import { Fragment, FunctionComponent, ReactElement, useCallback, useState } from "react";
import ModifierInterface from "../../../interfaces/Modifier.interface";
import ModifierBreakdown from "./ModifierBreakdown";

export type ModifierBreakdownTooltipProps = {
	modifier: ModifierInterface;
	children: ReactElement;
}

/**
 * Renders a component which shows a ModifierBreakdown as a tooltip on hover.
 * @param {ModifierInterface} modifier The modifier to show.
 * @param {React.ReactElement} children A child component which will trigger showing the breakdown on hover.
 *
 * @return {JSX.Element} The breakdown tooltip.
 */
const ModifierBreakdownTooltip: FunctionComponent<ModifierBreakdownTooltipProps> = (
	{
		modifier,
		children,
	}: ModifierBreakdownTooltipProps,
): JSX.Element => {
	const [ showBreakdown, setShowBreakdown ] = useState( false );
	const [ lockBreakdown, setLockBreakdown ] = useState( false );

	const openBreakdown = useCallback( () => {
		setShowBreakdown( true );
	}, [] );

	const closeBreakdown = useCallback( () => {
		setShowBreakdown( false );
	}, [] );

	const toggleBreakdownLock = useCallback( ( e ) => {
		if ( e.keyCode && e.keyCode !== 32 ) {
			return;
		}
		setLockBreakdown( ! lockBreakdown );
	}, [ lockBreakdown ] );

	return <Fragment>
		<div
			tabIndex={ 0 } role={ "button" }
			 className="show-breakdown"
			 onMouseEnter={ openBreakdown }
			 onMouseLeave={ closeBreakdown }
			 onClick={ toggleBreakdownLock }
			 onKeyDown={ toggleBreakdownLock }
		>
			{ children }
		</div>
		{ ( showBreakdown || lockBreakdown ) && <ModifierBreakdown modifier={ modifier } locked={ lockBreakdown } /> }
	</Fragment>;
};

export default ModifierBreakdownTooltip;
