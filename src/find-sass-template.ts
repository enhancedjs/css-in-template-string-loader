import { UpdateSourceOptions } from "./update-source"

export interface FoundTemplate {
  start: number
  end: number
  code: string
  varName: string
  stringType: string
  value: string
}

export function findSassTemplate(
  source: string,
  options: UpdateSourceOptions
): FoundTemplate | undefined {

  const lineBegin = `(?:^|\\n)`
  const identifier = "[a-zA-Z_][a-zA-Z0-9_]*"
  const varDeclar = `(?:const|let|var)\\s(${identifier})`
  const declEnd = "(?:\\s*;)?"

  const templateString = "`(?:[^`\\\\]*(?:\\\\.[^`\\\\]*)*)`"
  const prefix = "(sass|scss)"
  // const ct = `\\s*${prefix}\\s*(${templateString})`

  const reg = new RegExp(
    `${lineBegin}${varDeclar}\\s*=\\s*${prefix}\\s*(${templateString})\\s*${declEnd}`,
    "g"
  )

  const found = reg.exec(source)

  if (!found)
    return

  let start = found.index!
  console.log("Found: ", found)
  let [code, varName, stringType, sassCssCode] = found
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
    varName,
    stringType,
    // tslint:disable-next-line: no-eval
    value: eval(sassCssCode)
  }
}