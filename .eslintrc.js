module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false
	},
	plugins: ['jsdoc'],
	extends: [
		'plugin:prettier/recommended',
		'plugin:jsdoc/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js', 'webpack.config.js'],
	rules: {
		'curly': ['error', 'all'],
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-param-reassign': ['error', { props: false }],
		'object-curly-spacing': ['error', 'always'],
		'array-bracket-spacing': ['error', 'never'],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
		'jsdoc/no-undefined-types': 0,
		'jsdoc/require-returns-description': 0,
		'jsdoc/require-property-description': 0,
		'jsdoc/require-param-description': 0,
	},
};
