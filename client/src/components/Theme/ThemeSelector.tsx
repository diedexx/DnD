import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

type Theme = "dark" | "light";

/**
 * A toggle that switches between light and dark theme.
 *
 * @return {JSX.Element} The theme selector component.
 */
const ThemeSelector: FunctionComponent = (): JSX.Element => {
	const [ theme, setTheme ] = useState( "dark" as Theme );

	useEffect( () => {
		const savedTheme = localStorage.getItem( "theme" );
		if ( savedTheme ) {
			setTheme( savedTheme as Theme );
		}
	}, [] );

	useEffect( () => {
		document.body.classList.remove( "theme-dark" );
		document.body.classList.remove( "theme-light" );
		document.body.classList.add( "theme-" + theme );
		localStorage.setItem( "theme", theme );
	}, [ theme ] );

	const toggleTheme = useCallback(
		( value ) => setTheme( value === true ? "dark" : "light" ),
		[ setTheme ],
	);

	return <DarkModeToggle checked={ theme === "dark" } onChange={ toggleTheme } />;
};

export default ThemeSelector;
