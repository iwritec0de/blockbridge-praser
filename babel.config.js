module.exports = function (api) {
	const isProduction = api.env('production');
	const isESM = process.env.BABEL_ESM === 'true';
	return {
		presets: [
			['@babel/preset-env', { modules: isESM ? false : 'commonjs' }],
			['@babel/preset-react'],
			['@babel/preset-typescript'],
		],
		plugins: isProduction ? [
			'@babel/plugin-transform-react-constant-elements',
			'@babel/plugin-transform-react-inline-elements',
		] : [],
	};
};
