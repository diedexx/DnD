import { useSelect as wpUseSelect } from "@wordpress/data";

export type SelectorData<T> = {
	data: T;
	isLoading: boolean;
	startedLoading: boolean;
	finishedLoading: boolean
};

/**
 * Use select while also including the resolver state.
 *
 * @param {string} selector The selector function name.
 * @param {any[]} deps The dependencies/
 * @param {any[]} args The selector args.
 *
 * @return {SelectorData} The selector data and resolution state.
 */
const useSelect = <T = any>( selector: string, deps = [], ...args: any[] ): SelectorData<T> => {
	return wpUseSelect( ( select ): SelectorData<T> => {
		return {
			data: select( "app" )[ selector ]( ...args ),
			isLoading: select( "app" ).isResolving( selector, args ),
			startedLoading: select( "app" ).hasStartedResolution( selector, args ),
			finishedLoading: select( "app" ).hasFinishedResolution( selector, args ),
		};
	}, deps );
};
export default useSelect;
