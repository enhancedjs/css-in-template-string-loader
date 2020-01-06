import { writeFile } from "fs-extra"
import { CssSyntax } from "./find-sass-template"
import { compileSassCode } from "./sass-compiler"
import { updateSource } from "./update-source"

const pluginName = "SassInTemplateString"

interface Options {
  outputFilePath: string
}
interface CssChunk {
  code: string
  syntax: CssSyntax
  assetPath: string
}

export default class SassInTemplateString {

  outputFilePath: string

  constructor(options: Options) {
    this.outputFilePath = options.outputFilePath
    if (!this.outputFilePath)
          throw new Error("No output file path provided !")
  }

  apply(compiler: any) {
    let cssChunks: CssChunk[]

    compiler.hooks.beforeCompile.tapAsync(pluginName, (params: any, callback: any) => {
      cssChunks = []
      callback()
    })

    compiler.hooks.compilation.tap(pluginName, (bundle: any) => {
      bundle.hooks.optimizeModules.tap(pluginName, (modules: any) => {
        modules.forEach((mod: any) => {
          const assetPath: string = mod.request
          if (assetPath.endsWith(".ts") || assetPath.endsWith(".js")) {
            const updated = updateSource(mod._source._value)
            if (updated) {
              const { result, cssSourceCode, cssSyntax, cssCodeWithoutTag } = updated
              mod._source._value = result
              cssChunks.push({
                code: cssCodeWithoutTag,
                syntax: cssSyntax,
                assetPath
              })
            }
          }
        })
      })
    })


    compiler.hooks.done.tapAsync(pluginName, async (stats: any) => {
      const cssResults = []
      for (const cssChunk of cssChunks) {
        try {
          switch (cssChunk.syntax) {
            case "scss":
              cssResults.push(await compileSassCode(cssChunk.code, "scss"))
              break

            case "sass":
              cssResults.push(await compileSassCode(cssChunk.code, "sass"))
              break

            case "css":
              cssResults.push(cssChunk.code)
              break

            default:
              throw new Error("Syntax type must be specified")
          }
        } catch (error) {
          throw new Error(`${error} at ${cssChunk.assetPath}`)
        }
      }
      const data = [...cssResults].toString().replace(",", "")
      await writeFile(this.outputFilePath, data)
      console.log("Done")
    })

  }

}
