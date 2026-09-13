import type { OperationRecord } from "../../../application/control/operations/operationRecord"

export interface SecurityOperationController {
  start(type: string, id?: string): OperationRecord
  update(
    operationId: string,
    patch: Partial<OperationRecord>,
  ): void
}

export function createSecurityOperationController(
  start: (
    type: string,
    id?: string,
  ) => OperationRecord,
  update: (
    id: string,
    patch: Partial<OperationRecord>,
  ) => void,
): SecurityOperationController {
  return {
    start,
    update,
  }
}
