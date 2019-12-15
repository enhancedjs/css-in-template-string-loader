import loaderUtils from "loader-utils"
import { basename } from "path"
import { updateSource } from "./update-source"

export = async function (source: string) {
  const options = Object.assign(loaderUtils.getOptions(this) || {}, {
    sourceMap: this.sourceMap,
    filePath: this.resourcePath,
    fileName: basename(this.resourcePath)
  })

  const updated = await updateSource(source)
  if (!updated)
    return source

  const { result, cssResultCode, cssSourceCode, cssSyntax } = updated

  // TODO: Save the content of 'cssSourceCode' somewhere

  // console.info(`Result: '${result}'`)
  // console.info(`Updated: '${updated}'`)
  // console.info(
  //   `Source file '${options.fileName}': ${updated ? "updated" : "same"}`
  // )
  // if (source !== result)
  //   console.log("==> source:", result)
  return result
}