

# babel-plugin-dev-log

一款帮助在开发环境下进行日志输出与调试的 babel 插件



## 安装 

### npm

```json
 npm install babel-plugin-dev-log
```

### yarn

```json
yarn add babel-plugin-dev-log
```



## 使用

1. 配置 .eslintrc.js 文件

   ```javascript
   module.exports = {
     // 省略其他配置项
     globals: {
       __DEV__: true
     }
   }
   ```

2. babel 配置文件（如 `.babelrc.js`）

   ```javascript
   module.exports = {
     // 省略其他配置项
     plugins: [['dev-log']]
   }
   ```

3. 调试示例

   ```javascript
   if (__DEV__) {
     console.log("仅在开发环境下输出此条日志, 生产环境则忽略 if(__DEV__){...} 块中的代码")
   }
   ```



## 插件选项

| Name                   | Type        | Default                                 | Description                                                  |
| ---------------------- | ----------- | --------------------------------------- | ------------------------------------------------------------ |
| **`customIdentifier`** | `{String}`  | `__DEV__`                               | `if(__DEV__){}` 语句块中的标识符，可自定义配置标识符。**注意：** `.eslintrc.js 中 globals key 值应与标识符保持一致`。 |
| **`isProd`**           | `{Boolean}` | `process.env.NODE_ENV === "production"` | 在 `isProd` 为 `true` 的环境下，会移除 `if(__DEV__){...}` 块内的代码。多数用在项目构建打包阶段。 |