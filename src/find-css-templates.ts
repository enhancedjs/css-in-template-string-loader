export type CssSyntax = "css" | "scss" | "sass"

export interface FoundTemplate {
  start: number
  next: number
  tagName: CssSyntax
  valueToEval: string
  startLine: number
  lineCount: number
  startColumn: number
}

export function findCssTemplates(source: string): FoundTemplate[] {
  const newLine = `(?:\\r?\\n|\\r)`
  const lineBegin = `(?:^|${newLine})`
  const declEnd = "(?:\\s*;)?"
  const templateString = "`(?:[^`\\\\]*(?:\\\\.[^`\\\\]*)*)`"
  const prefix = "(css|scss|sass)"

  const reg = new RegExp(
    `${lineBegin}(${prefix}\\s*)(${templateString})\\s*${declEnd}`,
    "g"
  )

  const result: FoundTemplate[] = []
  let found: RegExpExecArray | null

  while (found = reg.exec(source)) {
    let start = found.index!
    let [code, prefixCode, tagName, valueToEval] = found

    if (code[0] === "\r" && code[1] === "\n") {
      start += 2
      code = code.substr(2)
    } else if (code[0] === "\n" || code[0] === "\r") {
      ++start
      code = code.substr(1)
    }

    const next = start + code.length

    result.push({
      start,
      next,
      tagName: tagName as CssSyntax,
      valueToEval,
      startLine: countLines(source.substr(0, start)),
      lineCount: countLines(code),
      startColumn: prefixCode.length + 1
    })
  }

  return result
}

function countLines(text: string) {
  return (text.match(/\r?\n|\r/g) || []).length
}