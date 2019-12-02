import { updateSource, UpdateSourceOptions } from "./update-source"

describe("Tests of 'updateSource'", () => {
  const options: UpdateSourceOptions = {
    fileName: "file1.js",
    filePath: "a/b/c/file1.js"
  }

  test("One variable named 'template'", () => {
    const source = ` //before
const template = scss\`h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}\`;
//After`
    const { result, updated } = updateSource(source, options)
    console.log(result)
    expect(updated).toBe(true)
    expect(result).toEqual(expect.not.stringContaining(`const template = scss\`h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}\`;`))
  })

})