import type { OperationRecord } from "../../../../application/control/operations/operationRecord"

export interface PaymentOperationController {
  start(type: string, id?: string): OperationRecord
  update(
    operationId: string,
    patch: Partial<OperationRecord>,
  ): void
}

export function createPaymentOperationController(
  start: (
    type: string,
    id?: string,
  ) => OperationRecord,
  update: (
    id: string,
    patch: Partial<OperationRecord>,
  ) => void,
): PaymentOperationController {
  return {
    start,
    update,
  }
}
