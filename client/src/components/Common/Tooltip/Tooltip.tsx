import { FunctionComponent, ReactNode, useCallback, useState } from "react";
import "./Tooltip.css";

export type TooltipProps = {
	children: ReactNode;
	handle: ReactNode;
	className?: string;
}

/**
 * Renders a component which shows a  tooltip on hover.
 * @param {ReactNode} handle The component which will trigger showing the breakdown on hover.
 * @param {ReactNode} children The tooltip that is shown when hovering the handle.
 *
 * @return {JSX.Element} The tooltip.
 */
const Tooltip: FunctionComponent<TooltipProps> = ( { handle, children, className }: TooltipProps,
): JSX.Element => {
	const [ show, setShow ] = useState( false );
	const [ lock, setLock ] = useState( false );

	const open = useCallback( () => setShow( true ), [] );
	const close = useCallback( () => setShow( false ), [] );

	const toggleLock = useCallback( ( e ) => {
		if ( e.keyCode && e.keyCode !== 32 ) {
			return;
		}
		setLock( ! lock );
	}, [ lock ] );

	const tooltipClassName = lock ? "tooltip--locked" : "tooltip";

	return <div className="tooltip__container">
		<span
			tabIndex={ 0 } role={ "button" }
			className="tooltip__handle"
			onMouseEnter={ open }
			onMouseLeave={ close }
			onClick={ toggleLock }
			onKeyDown={ toggleLock }
		>
			{ handle }
		</span>
		<div className="tooltip__target">
			{ ( show || lock ) && <div className={ [ className, tooltipClassName ].join( " " ) }>{ children }</div> }
		</div>
	</div>;
};

Tooltip.defaultProps = {
	className: "card",
};

export default Tooltip;
