import type { PageDataContext } from "./pageDataContext"

export function createPageDataContext(
  domain: string,
  route: string,
  entityId?: string,
): PageDataContext {
  return {
    domain,
    route,
    entityId,
    readOnly: true,
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
  }
}
