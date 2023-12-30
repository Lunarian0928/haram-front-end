const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api', // 링크 /api로 axios하면
        createProxyMiddleware({
            target: 'http://localhost:8080', // 링크 http://localhost:8080/api로 axios되어야 하지만
            changeOrigin: true,
            pathRewrite: {
                '^/api' : '' // pathRewrite를 통해, http://localhost:8080으로 axios됨
            }
        })
    );
    console.log("proxyware 실행완료"); // 확인 차 터미널에 출력
};