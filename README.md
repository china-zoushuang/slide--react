# swipe--react
a pragram scaffold with webpack and react

## 一、项目运行
### Package.json - Scripts
<pre><code>
"scripts": {
    "start": "node scripts/start.js",
    "staging": "rimraf dist && node scripts/staging.js",
    "build": "rimraf dist && node scripts/build.js"
}
</pre></code>

### 1、安装依赖

```
开发之前需要安装依赖：

yarn

（如果node-sass无法安装，请尝试：SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass）
```

### 2、本地开发环境
```
yarn start

会在本地启动一个监听 3000 端口的 node 服务器
```

### 3、staging测试环境
```
yarn staging

打测试包，可以进行代理
```

### 4、线上打包
```
yarn build

此命令会在 dist 文件夹下生成打包好的文件
```

### 5、样式约定
```
1、class 命名参照BEM规范。

2、字体请使用 rem，为方便计算，root font-size 为 108px。
