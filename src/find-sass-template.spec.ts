import { findSassTemplate } from "./find-sass-template"
import { UpdateSourceOptions } from "./update-source"

describe("Tests of 'findSassTemplate'", () => {
  const options: UpdateSourceOptions = {
    fileName: "file1.js",
    filePath: "a/b/c/file1.js"
  }
  test("With prefix 'scss' ou 'sass'", () => {
    const result = findSassTemplate(
      `
      //before
const template = scss\`h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}\`;
//After
      `,
      options
    )
    console.log(result)
    expect(result).toBeDefined()
  })

})