import { render, screen } from "@testing-library/react";
import App from "./App";
jest.mock( "react-dark-mode-toggle", () => () => null );

describe( "The App component", () => {
	it( "renders the menu", async() => {
		render( <App /> );
		const navElement = screen.getByTestId( "headerMenu" );
		expect( navElement ).toBeInTheDocument();
	} );

	it( "Defaults to the characters overview", async() => {
		render( <App /> );
		const titleElement = screen.getByTestId( "routeTitle" );
		expect( titleElement ).toBeInTheDocument();
		expect( titleElement ).toHaveTextContent( "Characters" );
	} );
} );
