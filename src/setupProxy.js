const proxy = require('http-proxy-middleware');
console.log(proxy);
module.exports = function(app) {
	app.use(
		proxy.createProxyMiddleware('/apis', {
			target: 'http://search-yichuang.datagrand.cn',
			changeOrigin: true,
			pathRewrite: {
				'^/apis': '/fronted/apis' // rewrite path
			}
		})
	);
};
