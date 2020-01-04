import { updateSource, UpdateSourceOutput } from "./update-source"

export async function sassInTemplateStringLoader(source: any): Promise<string | UpdateSourceOutput> {
  const updated = await updateSource(source)
  if (!updated)
    return source

  return updated
}