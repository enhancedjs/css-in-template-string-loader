import { updateSource } from "./update-source"

const pluginName = "SassInTemplateString"

class SassInTemplateString {

  constructor() {}

  apply(compiler: any) {
    compiler.hooks.thisCompilation.tap(pluginName, (compilation: any) => {
      console.log("Assets ", compilation.assets)
      compilation.hooks.buildModule.tap(pluginName,
        async (module: any) => {
          if (module.issuer && module.issuer._source) {
            const file: string = module.issuer._source._name
            if (file.endsWith(".ts") || file.endsWith(".js")) {
              if (file.endsWith("App.ts")) {
                console.log("App.ts source ", module.issuer._source._value)
              }
              const source = module.issuer._source._value
              let resultReturned: string
              const updated = await updateSource(source)
              console.log("Updated ", updated)
              if (updated) {
                const { result, cssResultCode, cssSourceCode, cssSyntax } = updated
                resultReturned = result
              } else {
                resultReturned = source
              }
              module.issuer._source._value = resultReturned
              // console.log("Mod ", module.issuer._source)
            }
          }
        }
      )
    })

  }

}

module.exports = SassInTemplateString



// import loaderUtils from "loader-utils"
// import { basename } from "path"
// import { updateSource } from "./update-source"

// export = async function (source: string) {
//   const options = Object.assign(loaderUtils.getOptions(this) || {}, {
//     sourceMap: this.sourceMap,
//     filePath: this.resourcePath,
//     fileName: basename(this.resourcePath)
//   })

//   const updated = await updateSource(source)
//   if (!updated)
//     return source

//   const { result, cssResultCode, cssSourceCode, cssSyntax } = updated

//   // TODO: Save the content of 'cssSourceCode' somewhere

//   // console.info(`Result: '${result}'`)
//   // console.info(`Updated: '${updated}'`)
//   // console.info(
//   //   `Source file '${options.fileName}': ${updated ? "updated" : "same"}`
//   // )
//   // if (source !== result)
//   //   console.log("==> source:", result)
//   return result
// }