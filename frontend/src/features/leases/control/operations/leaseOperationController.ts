import type { OperationRecord } from "../../../application/control/operations/operationRecord"

export interface LeaseOperationController {
  start(type: string, id?: string): OperationRecord
  update(
    operationId: string,
    patch: Partial<OperationRecord>,
  ): void
}

export function createLeaseOperationController(
  start: (
    type: string,
    id?: string,
  ) => OperationRecord,
  update: (
    id: string,
    patch: Partial<OperationRecord>,
  ) => void,
): LeaseOperationController {
  return {
    start,
    update,
  }
}
