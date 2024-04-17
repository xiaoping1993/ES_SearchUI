// 引入express框架
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

// 引入代理中间件
const { createProxyMiddleware  } = require('http-proxy-middleware');

//设置静态资源
app.use(express.static("./src"));
// 使用代理
app.use('/kibana', createProxyMiddleware({
    target: 'http://192.168.62.174:5601/kibana',
    pathRewrite: {
      '/kibana/api' : '/api'
	},
	onProxyRes: (proxyRes, req, res) => {
		console.log('Received response:', proxyRes.statusCode);
	},
	onProxyReq(proxyReq, req, res) {
		const cookies = req.headers.cookie
		console.log('Proxying request:', req.method, req.url, '->', proxyReq._headers.host + proxyReq.path);
	},
    changeOrigin: true
  
}));
//配置ftp环境
app.use(bodyParser.json({limit:'1000mb'}));
const ftp = new require("ftp");
const ftpClient = new ftp();
const ftpConfig = {
	host:"192.168.62.175",
	port:"21",
	user:"Administrator",
	password:"Perkinelmer235!",
};
//配置ftp环境
app.post("/upload-to-ftp", (req, res) => {
  const content = req.body.content;
  const fileName = req.body.fileName;
  const forderName = req.body.forderName;
  const remoteFilePath =forderName+"/"+fileName; // 指定FTP服务器上的文件路径
  // 将内容写入临时文件
  //const tempFilePath = "temp-content.txt";
  //fs.writeFileSync(tempFilePath, content);
  // 连接到FTP服务器
  ftpClient.connect(ftpConfig);
  //创建文件夹
  ftpClient.mkdir(forderName,true,(err) => {
	if (err){
	console.error(`无法创建文件夹：${folderName}`);
	} else {
		console.log(`已创建文件夹:${forderName}`);
		// 上传临时文件到FTP服务器
		ftpClient.put(Buffer.from(content), remoteFilePath, (error) => {
			if (error) {
			  console.error("Error uploading file:", error);
			  res.status(500).json({ error: "Error uploading file to FTP" });
			} else {
			  console.log("File uploaded successfully");
			  res.status(200).json({ message: "File uploaded to FTP server" });
			}
		});
	}
	// 删除临时文件
	//fs.unlinkSync(tempFilePath);
	// 关闭FTP连接
	ftpClient.end();
  })
  
});
app.listen(82);
console.log("服务启动成功");