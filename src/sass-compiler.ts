import { mkdirp, pathExists, writeFile } from "fs-extra"
import sass, { Options, Result, SassError } from "node-sass"
import { dirname } from "path"
import { FoundTemplate } from "./find-sass-template"
import { UpdateSourceOptions } from "./update-source"

export async function sassCompiler(
  foundTemplate: FoundTemplate,
  options: UpdateSourceOptions,
  isTest?: boolean
) {
  const outputFilePath = options.outputFilePath

  if (!outputFilePath)
    throw new Error("No output file path provided !")

  const outputDir = dirname(outputFilePath)

  let returnBoolean = false
  await sassRenderAsync({
    data: foundTemplate.value,
    outputStyle: "expanded"
  }).then(async (result) => {
    if (!isTest) {
      const cssDirExist = await pathExists(outputDir)
      if (!cssDirExist) {
        await mkdirp(outputDir)
      }
      await writeFile(outputFilePath, result.css.toString())
    }

    console.log("Css generated: ", result.css.toString())
    returnBoolean = true
  }, (error: SassError) => {
    throw new Error(`Sass Compiler Error: ${error.stack}`)
  })

  return returnBoolean
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