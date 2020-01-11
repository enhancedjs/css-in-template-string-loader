import { findSassTemplate } from "./find-sass-template"

describe("Tests of 'findSassTemplate'", () => {
  test("With prefix 'scss' ou 'sass'", () => {
    const result = findSassTemplate(
      `
      //before
scss\`h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}\`;
//After
      `
    )
    // console.log(result)
    expect(result).toBeDefined()
  })

})