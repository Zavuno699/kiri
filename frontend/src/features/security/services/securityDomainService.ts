import type { DomainService } from "../../../application/services/domainService"

export interface SecurityDomainService
  extends DomainService<
    unknown[],
    unknown
  > {}

export function createSecurityDomainService(
  collection: {
    list(
      query?: unknown,
    ): Promise<unknown[]>
  },
  detail: {
    get(
      id: string,
    ): Promise<unknown>
  },
): SecurityDomainService {
  return {
    list: collection.list,
    get: detail.get,
  }
}
