import { writeFile } from "fs-extra"
import { sassInTemplateStringLoader } from "./loader"
import { compileSassCode } from "./sass-compiler"

const pluginName = "SassInTemplateString"

interface Options {
  outputFilePath: string
}

export default class SassInTemplateString {

  static loader = sassInTemplateStringLoader
  outputFilePath: string

  constructor(options: Options) {
    this.outputFilePath = options.outputFilePath
  }

  apply(compiler: any) {
    const loader = SassInTemplateString.loader
    let cssChunks: string[]

    compiler.hooks.beforeCompile.tapAsync(pluginName, (params: any, callback: any) => {
      cssChunks = []
      callback()
    })

    compiler.hooks.compilation.tap(pluginName, (bundle: any) => {
      bundle.hooks.optimizeModules.tap(pluginName, (modules: any) => {
        modules.forEach((mod: any) => {
          const assetPath: string = mod.request
          if (assetPath.endsWith(".ts") || assetPath.endsWith(".js")) {
            const resultReturned = loader(mod._source._value)
            if (typeof resultReturned === "string") {
              mod._source._value = resultReturned
            } else {
              const { result, cssSourceCode, cssSyntax, cssCodeWithoutTag } = resultReturned
              mod._source._value = result
              cssChunks.push(cssCodeWithoutTag)
            }
          }
        })
      })
    })


    compiler.hooks.done.tapAsync(pluginName, async (stats: any) => {
      if (!this.outputFilePath)
          throw new Error("No output file path provided !")

      const cssResults = []
      for (const cssChunk of cssChunks) {
        const cssCode = await compileSassCode(cssChunk)
        cssResults.push(cssCode)
      }
      const data = [...cssResults]
      await writeFile(this.outputFilePath, data)
      console.log("Done")
    })

  }

}
