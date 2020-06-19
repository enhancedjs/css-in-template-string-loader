import { findCssTemplates } from "../src/find-css-templates"

describe("Tests of 'findSassTemplate'", () => {
  test("With prefix 'scss' ou 'sass'", () => {
    const result = findCssTemplates(
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
    expect(result.length).toBe(1)
  })

})