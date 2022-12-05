# CMS与即时通讯移动端应用所共用的后端接口

该项目是用node.js搭配koa2连接mysql数据库所开发的后端接口,采用MVC设计模式。默认开启的端口号为`localhost:3001`

### 实现功能
- 返回Mysql表中用户和管理用户的信息
- 实现模拟验证码
- 实现socket服务端功能（socket代码在www入口文件中）
- 实现图片上传功能

## 安装

```bash
git clone https://github.com/lsWorl/CMSDB.git
npm install
```



## 运行

```bash
npm start
```

