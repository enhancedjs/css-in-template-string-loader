import { findSassTemplate } from "./find-sass-template"
import { sassCompiler } from "./sass-compiler"

export interface UpdatedSource {
  result: string
  updated: boolean,
  cssIsGenerated: boolean
}

export interface UpdateSourceOptions {
  outputFilePath?: string
  filePath: string
  fileName: string
  sourceMap?: any
}

export async function updateSource(
  source: string,
  options: UpdateSourceOptions,
  isTest?: boolean
): Promise<UpdatedSource> {

  const foundTemplate = findSassTemplate(source, options)

  if (!foundTemplate) {
    return {
      result: source,
      updated: false,
      cssIsGenerated: false
    }
  }

  let cssIsGenerated: boolean
  if (isTest) {
    cssIsGenerated = await sassCompiler(foundTemplate, options, true)
  } else {
    cssIsGenerated = await sassCompiler(foundTemplate, options)
  }
  // console.log("FounTemplate: ", foundTemplate)

  let result = source
  result =
    result.substr(0, foundTemplate.start) +
    result.substr(foundTemplate.end)

  return {
    result,
    updated: true,
    cssIsGenerated
  }
}