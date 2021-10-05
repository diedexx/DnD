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
	ignorePatterns: [ '.eslintrc.js', 'src/migrations/*.ts' ],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		// Don't fall over decorators which start with an uppercase letter.
		"new-cap": 0,
		// Normal no-unused-vars doesn't work for TypeScript
		"no-unused-vars": "off",
		"require-jsdoc": [ "error", {
			require: {
				ClassDeclaration: false,
				FunctionDeclaration: true,
				MethodDefinition: true,
			}
		} ],
		"valid-jsdoc": [
			"error",
			{
				"prefer": {
					"return": "return"
				}
			}
		],
		// Replace no-shadow with typescript no-shadow
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": [ "error" ],
		// Duplicate class members are overloads and are allowed in TypeScript
		"no-dupe-class-members": "off",
		// Allow space before async arrow function
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}
		],
	},
	overrides: [
		{
			files: [ "*.spec.ts" ],
			rules: {
				"no-new": "off"
			}
		},
	],
	// Stupid, but required for extending the `Yoast` eslint config.
	settings: {
		"react": {
			"version": "16.8"
		}
	},
};
