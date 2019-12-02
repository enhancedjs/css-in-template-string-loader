# sass-in-template-string-loader

Compile Vue  sass templates in template strings at build time.

It allow to write single file components in standard JavaScript and TypeScript source files.

## How to use

First, add `sass-in-template-string-loader` to a Vue application:

```sh
npm install sass-in-template-string-loader --save-dev
```

In the `vue.config.js` file, add a `configureWebpack` section:

```js
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "sass-in-template-string-loader"
          }
        }
      ]
    }
  },
```

## Contribute

With VS Code, our recommanded plugin is:

* **TSLint** from Microsoft (`ms-vscode.vscode-typescript-tslint-plugin`)
