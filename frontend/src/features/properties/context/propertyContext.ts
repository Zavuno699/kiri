export interface PropertyContext {
  domain: "properties"
  entityId?: string
  correlationId?: string
  readOnly: boolean
}

export function createPropertyContext(
  entityId?: string,
): PropertyContext {
  return {
    domain: "properties",
    entityId,
    readOnly: true,
  }
}
