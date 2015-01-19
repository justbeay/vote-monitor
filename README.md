# 投票监控系统 #

## 使用的第三方JS库: ##
- JQuery
- highcharts

## 目录结构如下 ##
- css
- data（*专用于产生后台投票数据*）
	- data.sql（数据库初始化脚本）
	- queryVotes.php（投票查询页）
	- queryVotes1.php（简单的投票查询页，不查询数据库，投票数由随机数产生）
	- vote.htm（模拟投票页面）
	- vote.php(投票后台处理)
- images
- js
	- highcharts
	- jquery
	- base.js
	- chart.js
- index.htm（投票监控页面）
