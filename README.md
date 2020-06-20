# @enhancedjs/css-in-template-string-loader

[![Build Status](https://travis-ci.com/enhancedjs/css-in-template-string-loader.svg?branch=master)](https://travis-ci.com/enhancedjs/css-in-template-string-loader)
[![npm](https://img.shields.io/npm/dm/@enhancedjs/css-in-template-string-loader)](https://www.npmjs.com/package/@enhancedjs/css-in-template-string-loader)
![Type definitions](https://img.shields.io/npm/types/@enhancedjs/css-in-template-string-loader)
![GitHub](https://img.shields.io/github/license/enhancedjs/css-in-template-string-loader)

It is a webpack loader that extracts CSS and SASS code from JavaScript or TypeScript template strings. It allows to write single file components in standard JavaScript and TypeScript source files.

## Example

Add template strings with `scss`, `sass` or `css` tags:

```js
// a-source-file.js
// … Some JavaScript code …

scss`
section {
  background-color: #234;
}
`

// … Some JavaScript code …
```

This webpack loader will remove the template string at compile time, so it is unecessary to provide an implementation for the template tag. But, in a TypeScript project, a declaration has to be provided:

```ts
// global.d.ts
declare function scss(text: TemplateStringsArray): void
declare function sass(text: TemplateStringsArray): void
declare function css(text: TemplateStringsArray): void
```

## How to configure

First, install `@enhancedjs/css-in-template-string-loader` in your application:

```sh
npm install @enhancedjs/css-in-template-string-loader --save-dev
```

Add it in your webpack configuration. Here is an example of configuration for JavaScript source files that uses SCSS template strings:

```js
// webpack.config.js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@enhancedjs/css-in-template-string-loader",
            options: {
              cssLoaders: [
                "style-loader", // Or: MiniCssExtractPlugin.loader
                "css-loader",
                "sass-loader"
              ]
            }
          }
        ],
      },
    ]
  }
}
```

For TypeScript source files, it is the same configuration but with `ts-loader`:

```js
// webpack.config.js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          "ts-loader",
          {
            loader: "@enhancedjs/css-in-template-string-loader",
            options: {
              cssLoaders: [
                "style-loader", // Or: MiniCssExtractPlugin.loader
                "css-loader",
                "sass-loader"
              ]
            }
          },
        ]
      },
    ]
  }
}
```

Here is how to configure the loader with **Vue.js**:

```js
// vue.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // Notice: installed by Vue CLI

module.exports = {
  configureWebpack: config => ({
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "@enhancedjs/vue-template-in-string-loader",
            },
            {
              loader: "@enhancedjs/css-in-template-string-loader",
              options: {
                cssLoaders: [
                  config.mode === "development" ? "vue-style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader",
                ],
              },
            },
          ],
        },
      ],
    },
  }),
}
```

Notice: For performance reasons, it is recommanded to always put `@enhancedjs/css-in-template-string-loader` at the last position.

## See also

* The Visual Studio Code plugin [enhancedjs.sass-in-template-string](https://github.com/enhancedjs/sass-in-template-string-vscode).

## Contribute

With VS Code, our recommanded plugin is:

* **TSLint** from Microsoft (`ms-vscode.vscode-typescript-tslint-plugin`)
