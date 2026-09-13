import type { DomainService } from "../../../application/services/domainService"

export interface PaymentDomainService
  extends DomainService<
    unknown[],
    unknown
  > {}

export function createPaymentDomainService(
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
): PaymentDomainService {
  return {
    list: collection.list,
    get: detail.get,
  }
}
