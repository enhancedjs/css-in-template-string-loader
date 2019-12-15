export type CssSyntax = "css" | "scss" | "sass"

export interface FoundTemplate {
  start: number
  end: number
  code: string
  tagName: CssSyntax
  value: string
}

export function findSassTemplate(source: string): FoundTemplate | undefined {
  const lineBegin = `(?:^|\\n)`
  const declEnd = "(?:\\s*;)?"
  const templateString = "`(?:[^`\\\\]*(?:\\\\.[^`\\\\]*)*)`"
  const prefix = "(css|scss|sass)"

  const reg = new RegExp(
    `${lineBegin}${prefix}\\s*(${templateString})\\s*${declEnd}`,
    "g"
  )

  const found = reg.exec(source)

  if (!found)
    return

  let start = found.index!
  let [code, tagName, sassCssCode] = found
  if (code[0] === "\n") {
    ++start
    code = code.substr(1)
  }
  const lastIndex = code.length - 1
  if (code[lastIndex] === ";")
    code = code.substr(0, lastIndex)

  return {
    start,
    end: start + code.length,
    code,
    tagName: tagName as CssSyntax,
    // tslint:disable-next-line: no-eval
    value: eval(sassCssCode)
  }
}