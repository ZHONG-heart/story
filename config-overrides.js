const { override, addLessLoader, addPostcssPlugins, addWebpackAlias, addWebpackResolve } = require('customize-cra');
const path = require('path');

/* config-overrides.js */
module.exports = override(...overrideWebpack());

function overrideWebpack(config, env) {
	//do stuff with the webpack config...
	const options = [
		addPostcssPlugins([
			require('postcss-px-to-viewport')({
				unitToConvert: 'px', //需要转换的单位，默认为"px"；
				viewportWidth: 375, //设计稿的视口宽度
				unitPrecision: 5, //单位转换后保留的小数位数

				selectorBlackList: ['custom'],
				propList: ['*'],
				exclude: [/node_modules/]
			})
		]),
		addWebpackAlias({
			'@components': path.resolve(__dirname, 'src/components'),
		}),
		// addWebpackResolve({
		// 	extensions: ['.js', '.jsx', '.ts', '.tsx'],
		// })
	];

	return options;
}

const paths = require('react-scripts/config/paths');
paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
