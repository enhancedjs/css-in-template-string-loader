import sass, { Options, Result } from "node-sass"

export async function compileSassCode(cssCode: string) {
  const result = await sassRenderAsync({
    data: cssCode,
    outputStyle: "expanded"
  })
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