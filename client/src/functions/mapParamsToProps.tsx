import { FunctionComponent } from "react";
import { useParams } from "react-router";

/**
 * Maps React-router params to component props.
 *
 * @param {React.FunctionComponent<any>} Component The component to map props to.
 * @param {Object} paramMap The map of parameters to properties with an optional normalization function.
 *
 * @return {React.FunctionComponent} The new component with the props.
 */
const mapParamsToProps = (
	Component: FunctionComponent<any>,
	paramMap: { [ param: string ]: { name: string, normalize?: Function } },
): FunctionComponent => {
	return (): JSX.Element => {
		const params = useParams();
		const props = Object.entries( paramMap ).reduce(
			( acc: Object, [ paramName, prop ] ): Object => {
				if ( prop.normalize ) {
					acc[ prop.name ] = prop.normalize( params[ paramName ] );
					return acc;
				}
				acc[ prop.name ] = params[ paramName ];
				return acc;
			}, {} );

		return <Component { ...props } />;
	};
};
export default mapParamsToProps;
