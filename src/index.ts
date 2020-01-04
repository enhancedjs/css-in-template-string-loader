import { appendFile, exists, unlink } from "fs-extra"
import { sassInTemplateStringLoader } from "./loader"

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

    compiler.hooks.compilation.tap(pluginName, (bundle: any) => {
      bundle.hooks.optimizeModules.tap(pluginName, (modules: any) => {
        if (!this.outputFilePath)
          throw new Error("No output file path provided !")
        exists(this.outputFilePath, exists => {
          if (exists) {
            unlink(this.outputFilePath)
          }
        })
        // console.log("Output ", this.outputFilePath)
        modules.forEach(async (mod: any) => {
          // mod._source._value = mod._source._value + "dFFF"
          const resultReturned = await loader(mod._source._value)
          if (typeof resultReturned === "string") {
            mod._source._value = resultReturned
          } else {
            const { result, cssResultCode, cssSourceCode, cssSyntax } = resultReturned
            mod._source._value = result
            await appendFile(this.outputFilePath, cssResultCode)
            // console.log("Sour ", this.cssCode)
          }

          // console.log("Source file ", mod._source._value)
        })
        // console.log("Sour ", this.cssCode)
      })

    })

    // console.log("Sour ", cssCode)

  }

}
