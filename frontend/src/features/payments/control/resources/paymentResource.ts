import type { ResourceHandle } from "../../../../application/control/resourceHandle"

export type PaymentResource =
  ResourceHandle<unknown>

export function createPaymentResource(
  id?: string,
): PaymentResource {
  return {
    key: id
      ? "payments:" + id
      : "payments:list",
    lifecycle: "idle",
    version: 0,
    active: false,
  }
}
