# sass-in-template-string-plugin

[![Build Status](https://travis-ci.com/tomko-team/sass-in-template-string.svg?branch=master)](https://travis-ci.com/tomko-team/sass-in-template-string)
[![npm](https://img.shields.io/npm/dm/sass-in-template-string-plugin)](https://www.npmjs.com/package/sass-in-template-string-plugin)
![Type definitions](https://img.shields.io/npm/types/sass-in-template-string-plugin)
![GitHub](https://img.shields.io/github/license/tomko-team/sass-in-template-string)

This webpack plugin compiles SASS code in JavaScript template strings. It allows to write single file components in standard JavaScript and TypeScript source files.

## How to use

First, add `sass-in-template-string-plugin` to your application:

```sh
npm install sass-in-template-string-plugin --save-dev
```

In the webpack configuration:

```js
module.exports = {
  // …
  plugins: [new SassInTemplateStringPlugin({
    outputFile: `bundle.css`
  })]
}
```

## Contribute

With VS Code, our recommanded plugin is:

* **TSLint** from Microsoft (`ms-vscode.vscode-typescript-tslint-plugin`)
