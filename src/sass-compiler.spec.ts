import { FoundTemplate } from "./find-sass-template"
import { sassCompiler } from "./sass-compiler"
import { UpdateSourceOptions } from "./update-source"


describe("Tests of 'sassCompiler'", () => {
  const options: UpdateSourceOptions = {
    fileName: "file1.js",
    filePath: "c/file1.js"
  }
  const foundTemplate: FoundTemplate = {
    start: 16,
    end: 105,
    code: "const template = scss`h1 {\n  font-size: 40px;\n  code {\n    font-face: Roboto Mono;\n  }\n}`",
    varName: "template",
    stringType: "sass",
    value: "h1 {\n  font-size: 40px;\n  code {\n    font-face: Roboto Mono;\n  }\n}"
  }
  test("With ", () => {

    const result = sassCompiler(foundTemplate, options)
    console.log(result)
    // expect(result).toBeDefined()
  })

})