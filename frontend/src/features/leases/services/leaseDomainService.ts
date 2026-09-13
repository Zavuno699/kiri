import type { DomainService } from "../../../application/services/domainService"

export interface LeaseDomainService
  extends DomainService<
    unknown[],
    unknown
  > {}

export function createLeaseDomainService(
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
): LeaseDomainService {
  return {
    list: collection.list,
    get: detail.get,
  }
}
