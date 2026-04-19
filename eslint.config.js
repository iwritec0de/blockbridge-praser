const js = require('@eslint/js');
const pluginReact = require('eslint-plugin-react');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');

const sharedReactConfig = {
	plugins: { react: pluginReact },
	settings: { react: { version: 'detect' } },
	rules: {
		...pluginReact.configs.recommended.rules,
		'react/prop-types': 'off',
	},
};

module.exports = [
	{
		...js.configs.recommended,
		rules: {
			...js.configs.recommended.rules,
			'no-unused-vars': [ 'error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' } ],
		},
	},
	// JavaScript / JSX files.
	{
		files: ['src/**/*.{js,jsx}'],
		...sharedReactConfig,
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
	},
	// TypeScript / TSX files.
	{
		files: ['src/**/*.{ts,tsx}'],
		...sharedReactConfig,
		languageOptions: {
			parser: tsParser,
			globals: { ...globals.browser, ...globals.node },
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
	},
	// Test files — add Jest globals.
	{
		files: ['src/**/__tests__/**/*.{js,jsx,ts,tsx}', 'src/**/*.test.{js,jsx,ts,tsx}'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node, ...globals.jest },
		},
	},
	{ ignores: ['lib/', 'node_modules/', 'webpack/'] },
];
