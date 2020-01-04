import { updateSource } from "./update-source"

const pluginName = "SassInTemplateStringPlugin"

export default class SassInTemplateStringPlugin {

  constructor() {}

  apply(compiler: any) {
    compiler.hooks.compilation.tap(pluginName, (bundle: any) => {
      bundle.hooks.optimizeModules.tap(pluginName, (modules: any) => {
        modules.forEach(async (mod: any) => {
          // mod._source._value = mod._source._value + "dFFF"
          const source = mod._source._value
          const updated = await updateSource(source)
          if (updated) {
            const { result, cssResultCode, cssSourceCode, cssSyntax } = updated
            mod._source._value = result + "dFFF"
          }

          // console.log("Source file ", mod._source._value)
        })
      })
    })

  }

}