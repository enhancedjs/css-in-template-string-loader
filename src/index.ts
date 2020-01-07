import { writeFile } from "fs-extra"
import { basename } from "path"
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
  assetLine: number
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
              const { result, cssSyntax, cssCodeWithoutTag, assetLine } = updated
              mod._source._value = result
              cssChunks.push({
                code: cssCodeWithoutTag,
                syntax: cssSyntax,
                assetPath,
                assetLine,
              })
            }
          }
        })
      })
    })

    compiler.hooks.done.tapAsync(pluginName, async () => {
      const bundle: string[] = []
      for (const { code, syntax, assetPath, assetLine } of cssChunks) {
        try {
          const assetName = basename(assetPath)
          bundle.push(`/* ${assetName} */`)
          switch (syntax) {
            case "scss":
              bundle.push(await compileSassCode(code, "scss"))
              break

            case "sass":
              bundle.push(await compileSassCode(code, "sass"))
              break

            case "css":
              bundle.push(code)
              break

            default:
              throw new Error("Syntax type must be specified")
          }
        } catch (error) {
          const prefix = "[SassInTemplateString] Error: "
          console.error(`${prefix}${error.message ?? error} at ${assetPath}:${assetLine}`)
        }
      }
      await writeFile(this.outputFilePath, bundle.join("\n"))
    })
  }
}
