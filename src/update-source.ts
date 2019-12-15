import { CssSyntax, findSassTemplate } from "./find-sass-template"
import { compileSassCode } from "./sass-compiler"

export interface UpdateSourceOutput {
  result: string
  cssSourceCode: string
  cssSyntax: CssSyntax
  cssResultCode: string
}

export async function updateSource(source: string): Promise<UpdateSourceOutput | undefined> {
  const foundTemplate = findSassTemplate(source)
  if (!foundTemplate)
    return

  const cssCode = await compileSassCode(foundTemplate)

  const result = source.substr(0, foundTemplate.start) + source.substr(foundTemplate.end)

  return {
    result,
    cssSourceCode: foundTemplate.code,
    cssSyntax: foundTemplate.tagName,
    cssResultCode: cssCode
  }
}