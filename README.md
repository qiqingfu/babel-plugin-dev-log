

# babel-plugin-dev-log

helps developers debug and log output in the development environment



## Install 

### npm

```json
 npm install babel-plugin-dev-log
```

### yarn

```json
yarn add babel-plugin-dev-log
```



## Usage

1. Configure the `.eslintrc.js` file

   ```javascript
   module.exports = {
     // Omit other configuration items
     globals: {
       __DEV__: true
     }
   }
   ```

2. The Babel configuration file（such as `.babelrc.js`）

   ```javascript
   module.exports = {
     // Omit other configuration items
     plugins: [['dev-log']]
   }
   ```

3. Output in the project

   ```javascript
   if (__DEV__) {
     console.log("This log is printed only in the development environment. Production ignores if(__DEV__){...} block")
   }
   ```



## Options

| Name                   | Type        | Default                                 | Description                                                  |
| ---------------------- | ----------- | --------------------------------------- | ------------------------------------------------------------ |
| **`customIdentifier`** | `{String}`  | `__DEV__`                               | Use a custom identifier. **notes：** The key value of the globals option in the `.eslintrc.js` file should be the same as the custom identifier. |
| **`isProd`**           | `{Boolean}` | `process.env.NODE_ENV === "production"` | When isProd is true, remove `if(__DEV__){...}` block. Most applications are in the package build phase. |