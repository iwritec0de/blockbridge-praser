module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(css)$': 'identity-obj-proxy',
		// html-react-parser's transitive dep (domhandler) is ESM-only with no CJS build.
		// Mock it for tests; real parsing behavior tested in component tests.
		'^html-react-parser$': '<rootDir>/src/__tests__/__mocks__/html-react-parser.js',
	},
	setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
	testMatch: ['<rootDir>/src/**/__tests__/**/*.test.{js,jsx,ts,tsx}'],
	testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/'],
	modulePathIgnorePatterns: ['<rootDir>/lib/'],
};
