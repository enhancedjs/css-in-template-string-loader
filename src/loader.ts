import { updateSource } from "./update-source"

export async function sassInTemplateStringLoader(source: any) {
  const updated = await updateSource(source)
  if (!updated)
    return source

  const { result, cssResultCode, cssSourceCode, cssSyntax } = updated

  return result
}