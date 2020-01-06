import sass, { Options, Result } from "node-sass"

export async function compileSassCode(cssCode: string, syntaxType: "scss"| "sass") {
  let result: sass.Result
  if (syntaxType === "scss") {
    result = await sassRenderAsync({
      data: cssCode,
      outputStyle: "expanded"
    })
  } else {
    result = await sassRenderAsync({
      data: cssCode,
      indentedsyntax: true,
      outputStyle: "expanded"
    })
  }
  return result.css.toString()
}

function sassRenderAsync(
  options: Options
): Promise<Result> {
  return new Promise((resolve, reject) => {
    sass.render(options, (err, result) => {
      if (err)
        reject(err)
      else
        resolve(result)
    })
  })
}