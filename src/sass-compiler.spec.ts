import { FoundTemplate } from "./find-sass-template"
import { compileSassCode } from "./sass-compiler"


describe("Tests of 'sassCompiler'", () => {
  // const options: UpdateSourceOptions = {
  //   outputFilePath: "extracted/style.css",
  //   fileName: "file1.js",
  //   filePath: "c/file1.js"
  // }
  const foundTemplate: FoundTemplate = {
    start: 16,
    end: 105,
    code: "const template = scss`h1 {\n  font-sizee: 40px;\n  code {\n    font-face: Roboto Mono;\n  }\n}`",
    tagName: "sass",
    value: "h1 {\n  font-sizee: 40px;\n  code {\n    font-face: Roboto Mono;\n  }\n}"
  }
  test("With ", async () => {

    const result = await compileSassCode(foundTemplate)

    expect(result).toBeTruthy()
  })

})