module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: [ '@typescript-eslint/eslint-plugin' ],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'yoast'
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: [ '.eslintrc.js' ],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		// Don't fall over decorators which start with an uppercase letter.
		"new-cap": 0,
		// Normal no-unused-vars doesn't work for TypeScript
		"no-unused-vars": "off",
	},
	// Stupid, but required for extending the `Yoast` eslint config.
	settings: {
		"react": {
			"version": "16.8"
		}
	}
};
