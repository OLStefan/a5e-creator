module.exports = {
	plugins: {
		'postcss-plugin-namespace': [':global(#a5e)', { ignore: [':root'] }],
		'postcss-flexbugs-fixes': {},
		'postcss-preset-env': {
			autoprefixer: {
				flexbox: 'no-2009',
			},
			stage: 3,
			features: {
				'custom-properties': false,
			},
		},
		'postcss-nesting': {},
	},
};
