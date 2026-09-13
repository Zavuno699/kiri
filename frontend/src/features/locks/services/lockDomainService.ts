import type { DomainService } from "../../../application/services/domainService"

export interface LockDomainService
  extends DomainService<
    unknown[],
    unknown
  > {}

export function createLockDomainService(
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
): LockDomainService {
  return {
    list: collection.list,
    get: detail.get,
  }
}
