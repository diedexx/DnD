import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./app.css";
import Header from "./components/Header/Header";
import Toast from "./components/Toast/Toast";
import { Route as AppRoute, routes } from "./routes";
import "./state/store";

/**
 * Get the React router routes.
 *
 * @return {JSX.Element[]} The routes.
 */
function getRoutes() {
	return Object.values( routes ).map( ( route: AppRoute ) =>
		<Route key={ route.title } path={ route.path } exact={ route.exact }>
			<main className={ "page--" + route.format }>
				<h2 data-testid="routeTitle">{ route.title }</h2>
				<route.component />
			</main>
		</Route>,
	);
}

/**
 * The app component.
 *
 * @return {JSX.Element} The app component.
 */
function App() {
	return (
		<BrowserRouter>
			<Toast />
			<Header />
			{ getRoutes() }
		</BrowserRouter>
	);
}

export default App;
