# css-in-template-string-loader

[![Build Status](https://travis-ci.com/enhancedjs/css-in-template-string-loader.svg?branch=master)](https://travis-ci.com/enhancedjs/css-in-template-string-loader)
[![npm](https://img.shields.io/npm/dm/@enhancedjs/css-in-template-string-loader)](https://www.npmjs.com/package/@enhancedjs/css-in-template-string-loader)
![Type definitions](https://img.shields.io/npm/types/@enhancedjs/css-in-template-string-loader)
![GitHub](https://img.shields.io/github/license/enhancedjs/css-in-template-string-loader)

This webpack plugin compiles SASS code in JavaScript template strings. It allows to write single file components in standard JavaScript and TypeScript source files.

## Example

In JavaScript, add template strings with `scss`, `sass` or `css` tags:

```js
scss`
section {
  background-color: #234;
}
`
```

In TypeScript, it will be required to declare a global definition for the template tag:

```ts
// global.d.ts
declare function scss(...args: any): void
```

## How to configure

First, add `@enhancedjs/css-in-template-string-loader` to your application:

```sh
npm install @enhancedjs/css-in-template-string-loader --save-dev
```

In the webpack configuration, here is an example of configuration for JavaScript source files that uses SCSS template strings:

```js
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
                MiniCssExtractPlugin.loader,
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

For TypeScript source files, add the same configuration just before the `ts-loader`:

```js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "@enhancedjs/css-in-template-string-loader",
            options: {
              cssLoaders: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
              ]
            }
          },
          "ts-loader"
        ]
      },
    ]
  }
}
```

## Contribute

With VS Code, our recommanded plugin is:

* **TSLint** from Microsoft (`ms-vscode.vscode-typescript-tslint-plugin`)
