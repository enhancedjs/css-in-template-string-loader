import { getOptions } from "loader-utils"
import { basename } from "path"
import { CssSyntax } from "./find-css-templates"
import { extractFromSource, replaceCssWithImport } from "./update-source"

export = function (source: string): string {
  const resourcePath: string = this.resourcePath
  const resourceQuery: string = this.resourceQuery
  // console.log("[loader] resourcePath:", resourcePath)
  // console.log("[loader] resourceQuery:", resourceQuery)

  if (resourceQuery) {
    const regex = /\?extractcss&tag=(css|scss|sass)$/
    const match = regex.exec(resourceQuery)
    // console.log(`[loader][EXTRACT] with tag '${resourceQuery}':`, match)
    if (!match)
      return source
    const tag = match[1] as CssSyntax

    // console.log(`[loader][EXTRACT] with tag '${tag}':`, extractFromSource(source, { tag }))
    return extractFromSource(source, { tag })
  }

  const options = getOptions(this)
  const cssLoaders: any = options.cssLoaders
  // console.log("[loader] options.cssLoaders:", cssLoaders)
  if (!cssLoaders || !Array.isArray(cssLoaders) || cssLoaders.length === 0)
    throw new Error(`Invalid options, an option 'cssLoaders' of type 'string[]' is required`)

  const fileName = basename(resourcePath)
  // console.log(`[loader][JS] with fileName '${fileName}':`, replaceCssWithImport(source, { fileName, cssLoaders }))
  return replaceCssWithImport(source, { fileName, cssLoaders })
}
