import type { DomainService } from "../../../application/services/domainService"

export interface DeviceDomainService
  extends DomainService<
    unknown[],
    unknown
  > {}

export function createDeviceDomainService(
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
): DeviceDomainService {
  return {
    list: collection.list,
    get: detail.get,
  }
}
