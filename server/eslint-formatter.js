const { CLIEngine } = require( "eslint" );

module.exports = function( results ) {
	const formatter = CLIEngine.getFormatter( "stylish" );
	const formatted = formatter( results );
	// Only works if ran from the project root.
	return formatted.replace( process.cwd() + "/", "" );
};
