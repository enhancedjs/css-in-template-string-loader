import sass, { Options, Result } from "node-sass"
import { FoundTemplate } from "./find-sass-template"

export async function compileSassCode(foundTemplate: FoundTemplate) {
  const result = await sassRenderAsync({
    data: foundTemplate.value,
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