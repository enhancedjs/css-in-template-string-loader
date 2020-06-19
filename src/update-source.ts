import { CssSyntax, findCssTemplates } from "./find-css-templates"

export interface ReplaceCssWithImportOptions {
  fileName: string
  cssLoaders: string[]
}

export function replaceCssWithImport(source: string, options: ReplaceCssWithImportOptions): string {
  const foundTemplates = findCssTemplates(source)
  foundTemplates.reverse()

  let result = source
  for (const found of foundTemplates) {
    const loaders = `!${options.cssLoaders.join("!")}!@enhancedjs/css-in-template-string-loader!`
    const importCode = `import "${loaders}./${options.fileName}?extractcss&tag=${found.tagName}";`
    const padding = "\n".repeat(found.lineCount)
    result = result.substr(0, found.start)
      + importCode
      + padding
      + result.substr(found.end)
  }

  return result
}

export interface ExtractFromSourceOptions {
  tag: CssSyntax
}

export function extractFromSource(source: string, { tag }: ExtractFromSourceOptions): string {
  const foundTemplates = findCssTemplates(source)

  const result: string[] = []
  let fromLine = 0
  for (const found of foundTemplates) {
    if (tag !== found.tagName)
      continue

    if (tag !== "css") { // Insert padding only for compiled syntaxes
      result.push("\n".repeat(found.startLine - fromLine))
      fromLine = found.startLine + found.lineCount + 1
    }

    // tslint:disable-next-line: no-eval
    result.push(eval(found.valueToEval))
  }

  return result.join("\n")
}