import { findSassTemplate } from "./find-sass-template"
import { sassCompiler } from "./sass-compiler"

export interface UpdatedSource {
  result: string
  updated: boolean
}

export interface UpdateSourceOptions {
  filePath: string
  fileName: string
  sourceMap?: any
}

export function updateSource(
  source: string,
  options: UpdateSourceOptions
): UpdatedSource {

  const foundTemplate = findSassTemplate(source, options)

  if (!foundTemplate) {
    return {
      result: source,
      updated: false
    }
  }

  sassCompiler(foundTemplate, options)
  // console.log("FounTemplate: ", foundTemplate)

  let result = source
  result =
    result.substr(0, foundTemplate.start) +
    result.substr(foundTemplate.end + 1)

  return {
    result,
    updated: true
  }
}