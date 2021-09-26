import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./app.css";
import Header from "./components/Header/Header";
import { Route as AppRoute, routes } from "./routes";

/**
 * Get the React router routes.
 *
 * @return {JSX.Element[]} The routes.
 */
function getRoutes() {
	return Object.values( routes ).map( ( route: AppRoute ) =>
		<Route key={ route.title } path={ route.path } exact={ route.exact }>
			<h2 data-testid="routeTitle">{ route.title }</h2>
			<route.component />
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
			<Header />
			{ getRoutes() }
		</BrowserRouter>
	);
}

export default App;
