import { FunctionComponent } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Spinner.css";

/**
 * A loading indicator component.
 *
 * @return {JSX.Element} The loading indicator component.
 */
const Spinner: FunctionComponent = (): JSX.Element => {
	return <div className="spinner--fullscreen">
		<Loader type="MutatingDots" color="#43789c" secondaryColor="#f33" height={ 100 } width={ 100 } />
	</div>;
};

export default Spinner;

