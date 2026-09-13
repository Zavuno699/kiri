import type { DomainService } from "../../../application/services/domainService"

export interface PropertyDomainService
  extends DomainService<
    unknown[],
    unknown
  > {}

export function createPropertyDomainService(
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
): PropertyDomainService {
  return {
    list: collection.list,
    get: detail.get,
  }
}
