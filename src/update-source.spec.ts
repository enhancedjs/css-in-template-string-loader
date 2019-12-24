import { updateSource } from "./update-source"

describe("Tests of 'updateSource'", () => {
  test("One variable named 'template'", async () => {
    const partToExtract = `scss\`h1 {
  font-size: 40px;
  code {
    font-face: Roboto Mono;
  }
}\`;`
    const source = ` //before
${partToExtract}
//After`
    const updated = await updateSource(source)
    // console.log(result)
    expect(updated === undefined).toBe(false)
    // expect(updated!.cssResultCode).toBe(expect.stringContaining(partToExtract))
    expect(updated!.result).toEqual(expect.not.stringContaining(partToExtract))
  })
})