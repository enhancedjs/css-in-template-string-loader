import { updateSource, UpdateSourceOutput } from "./update-source"

export function sassInTemplateStringLoader(source: any): string | UpdateSourceOutput {
  const updated = updateSource(source)
  if (!updated)
    return source

  return updated
}