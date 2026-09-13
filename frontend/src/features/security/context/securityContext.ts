export interface SecurityContext {
  domain: "security"
  entityId?: string
  correlationId?: string
  readOnly: boolean
}

export function createSecurityContext(
  entityId?: string,
): SecurityContext {
  return {
    domain: "security",
    entityId,
    readOnly: true,
  }
}
