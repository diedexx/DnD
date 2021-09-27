import { useDispatch, useSelect as wpUseSelect } from "@wordpress/data";
import { useCallback } from "react";

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
 * @param {any[]} args The selector args and dependencies.
 *
 * @return {SelectorData} The selector data and resolution state.
 */
const useResolvingSelect = <T = any>( selector: string, ...args: any[] ): SelectorData<T> => {
	return wpUseSelect( ( select ): SelectorData<T> => {
		const selectors = select( "app" );
		return {
			data: selectors[ selector ]( ...args ),
			isLoading: selectors.isResolving( selector, args ),
			startedLoading: selectors.hasStartedResolution( selector, args ),
			finishedLoading: selectors.hasFinishedResolution( selector, args ),
		};
	}, args );
};

/**
 * Creates a function which refreshes a resolver state, causing it to reload if the selector is in use.
 * @param {string} selector The selector to invalidate the resolution for.
 * @param {any[]} args The selector args.
 *
 * @return {Function} The function which resets the resolver state.
 */
export const useRefreshResolver = ( selector: string, ...args: any[] ) => {
	const { invalidateResolution } = useDispatch( "app" );
	return useCallback( () => {
		invalidateResolution( selector, args );
	}, [ invalidateResolution, selector, args ] );
};

export default useResolvingSelect;
