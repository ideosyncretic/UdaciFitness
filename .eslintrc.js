module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: 'eslint:recommended',
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		sourceType: 'module',
		allowImportExportEverywhere: false,
		codeFrame: false,
	},
	plugins: ['eslint-plugin-react'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'react/jsx-uses-vars': 1,
		'react/jsx-uses-react': 1,
	},
}
