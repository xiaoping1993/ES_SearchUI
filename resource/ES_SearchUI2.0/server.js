// 引入express框架
const express = require("express");
const app = express();

// 引入代理中间件
const { createProxyMiddleware  } = require('http-proxy-middleware');

// // 设置静态资源
app.use(express.static("./src"));

// 使用代理
app.use('/', createProxyMiddleware({
    target: 'http://47.103.64.41:5601',
    pathRewrite: {
        '^/api' : ''
    },
    changeOrigin: true
  
}));

app.listen(82);
console.log("服务启动成功");