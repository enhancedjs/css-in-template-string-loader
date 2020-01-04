import { sassInTemplateStringLoader } from "./loader"

const pluginName = "SassInTemplateString"

export default class SassInTemplateString {

  static loader = sassInTemplateStringLoader

  constructor() {}

  apply(compiler: any) {
    const loader = SassInTemplateString.loader

    compiler.hooks.compilation.tap(pluginName, (bundle: any) => {
      bundle.hooks.optimizeModules.tap(pluginName, (modules: any) => {
        modules.forEach(async (mod: any) => {
          // mod._source._value = mod._source._value + "dFFF"
          const result = await loader(mod._source._value)
          mod._source._value = result

          // console.log("Source file ", mod._source._value)
        })
      })
    })

  }

}
