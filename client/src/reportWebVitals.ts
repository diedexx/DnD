import { ReportHandler } from "web-vitals/dist/modules/types";

/**
 * Reports on web-vitals.
 *
 * @param {ReportHandler} onPerfEntry The reporthandler.
 *
 * @returns {void}
 */
const reportWebVitals = ( onPerfEntry?: ReportHandler ): void => {
	if ( onPerfEntry ) {
		import( "web-vitals" ).then( ( { getCLS, getFID, getFCP, getLCP, getTTFB } ) => {
			getCLS( onPerfEntry );
			getFID( onPerfEntry );
			getFCP( onPerfEntry );
			getLCP( onPerfEntry );
			getTTFB( onPerfEntry );
		} );
	}
};

export default reportWebVitals;
