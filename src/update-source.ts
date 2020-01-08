import { CssSyntax, findSassTemplate } from "./find-sass-template"

export interface UpdateSourceOutput {
  result: string
  cssSourceCode: string
  cssSyntax: CssSyntax
  cssCodeWithoutTag: string
  assetLine: number
  cssStartColumn: number
}

export function updateSource(source: string): UpdateSourceOutput | undefined {
  const foundTemplate = findSassTemplate(source)
  if (!foundTemplate)
    return

  const result = source.substr(0, foundTemplate.start) + source.substr(foundTemplate.end)

  return {
    result,
    cssSourceCode: foundTemplate.code,
    cssSyntax: foundTemplate.tagName,
    cssCodeWithoutTag: foundTemplate.value,
    assetLine: foundTemplate.startLine,
    cssStartColumn: foundTemplate.startColumn
  }
}