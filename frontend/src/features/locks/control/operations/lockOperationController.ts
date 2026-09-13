import type { OperationRecord } from "../../../application/control/operations/operationRecord"

export interface LockOperationController {
  start(type: string, id?: string): OperationRecord
  update(
    operationId: string,
    patch: Partial<OperationRecord>,
  ): void
}

export function createLockOperationController(
  start: (
    type: string,
    id?: string,
  ) => OperationRecord,
  update: (
    id: string,
    patch: Partial<OperationRecord>,
  ) => void,
): LockOperationController {
  return {
    start,
    update,
  }
}
