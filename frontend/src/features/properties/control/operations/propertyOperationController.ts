import type { OperationRecord } from "../../../../application/control/operations/operationRecord"

export interface PropertyOperationController {
  start(type: string, id?: string): OperationRecord
  update(
    operationId: string,
    patch: Partial<OperationRecord>,
  ): void
}

export function createPropertyOperationController(
  start: (
    type: string,
    id?: string,
  ) => OperationRecord,
  update: (
    id: string,
    patch: Partial<OperationRecord>,
  ) => void,
): PropertyOperationController {
  return {
    start,
    update,
  }
}
