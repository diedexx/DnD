import { FunctionComponent } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Delayed from "../Delayed/Delayed";
import "./Spinner.css";

interface SpinnerProps {
	type: "fullscreen" | "inline";
}

/**
 * A loading indicator component.
 *
 * @param {"fullscreen" | "inline"} type The type of spinner.
 *
 * @return {JSX.Element} The loading indicator component.
 */
export const Spinner: FunctionComponent<SpinnerProps> = ( { type } ): JSX.Element => {
	return <div className={ "spinner--" + type }>
		<Loader type="MutatingDots" color="#43789c" secondaryColor="#f33" height={ 100 } width={ 100 } />
	</div>;
};

/**
 * A loading indicator component which is shown after a short delay of 200ms.
 *
 * @param {"fullscreen" | "inline"} type The type of spinner.
 *
 * @return {JSX.Element} The delayed loading indicator.
 */
export const DelayedSpinner: FunctionComponent<SpinnerProps> = ( { type } ): JSX.Element => {
	return <Delayed waitBeforeShow={ 200 }><Spinner type={ type } /></Delayed>;
};

export default Spinner;

