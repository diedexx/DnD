import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Route, routes } from "../../routes";
import "./Header.css";
import ThemeSelector from "../Theme/ThemeSelector";

/**
 * The app header, containing the navigation menu.
 *
 * @return {JSX.Element} The app header.
 */
const Header: FunctionComponent = (): JSX.Element => {
	return <div className="header">
		<nav className="headerMenu" data-testid="headerMenu">
			<ul className="headerMenuList">
				{ getMenuListItems() }
			</ul>
		</nav>
		<ThemeSelector />
	</div>;
};

/**
 * Gets the navigation menu items.
 *
 * @return {JSX.Element} The navigation menu items.
 */
function getMenuListItems(): JSX.Element[] {
	return Object.values( routes )
		.filter( ( route: Route ) => route.inNavMenu )
		.map( ( route: Route ) =>
			<li key={ route.title } className="headerMenuList__item">
				<Link className="headerMenuList__link" to={ route.path }>{ route.title }</Link>
			</li>,
		);
}

export default Header;
