import { existsSync, mkdirSync, writeFileSync } from "fs"
import sass from "node-sass"
import { FoundTemplate } from "./find-sass-template"
import { UpdateSourceOptions } from "./update-source"

export function sassCompiler(
  foundTemplate: FoundTemplate,
  options: UpdateSourceOptions
) {

  const scssDirExist = existsSync("extracted/scss")
  console.log("exist", scssDirExist)
  if (scssDirExist === false) {
    mkdirSync("extracted/scss", { recursive: true })
  }

  const cssDirExist = existsSync("extracted/css")
  if (!cssDirExist) {
    mkdirSync("extracted/css", { recursive: true })
  }

  writeFileSync("extracted/scss/style.scss", foundTemplate.value)

  const result = sass.renderSync({
    file: "extracted/scss/style.scss",
    outputStyle: "expanded"
  })

  writeFileSync("extracted/css/style.css", result.css.toString())

  console.log("Css generated: ", result.css.toString())

}