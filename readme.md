## 项目背景
	为了替换attivio search产品，所做的尝试，本项目采用ELK模式，全是免费开源项目，解决目前项目所需，同时保证了稳定性
## 项目原理
	通过ELK产品搭建一套 语义化分析系统，解析非结构化数据，到搜索引擎中
	针对logstash解析工具做了很多定制化的改造和满足医院业务需要的功能痛点解决
	之后开发一套前端搜索页面用于与spotfire分析软件做嵌入，最小限度影响接入之前的业务系统（综合索引系统）
## 测试环境
	http://47.103.64.41:82/searchui.html
## 资料
	开发设计中产生的很多文档资料都在resource文件夹中，有需要请查看