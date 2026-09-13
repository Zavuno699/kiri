import type { DomainService } from "../../../application/services/domainService"

export interface DashboardDomainService
  extends DomainService<
    unknown[],
    unknown
  > {}

export function createDashboardDomainService(
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
): DashboardDomainService {
  return {
    list: collection.list,
    get: detail.get,
  }
}
