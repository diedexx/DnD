import { FunctionComponent } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

/**
 * A toast component which can display messages using react-toastify.toast.info()
 *
 * @return {JSX.Element} The toast component.
 */
const Toast: FunctionComponent = (): JSX.Element => <ToastContainer
	position="top-right"
	autoClose={ 5000 }
	hideProgressBar={ false }
	newestOnTop={ false }
	closeOnClick={ true }
	pauseOnFocusLoss={ true }
	draggable={ true }
	pauseOnHover={ true }
/>;

export default Toast;
