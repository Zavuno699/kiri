import type { OperationRecord } from "../../../application/control/operations/operationRecord"

export interface DashboardOperationController {
  start(type: string, id?: string): OperationRecord
  update(
    operationId: string,
    patch: Partial<OperationRecord>,
  ): void
}

export function createDashboardOperationController(
  start: (
    type: string,
    id?: string,
  ) => OperationRecord,
  update: (
    id: string,
    patch: Partial<OperationRecord>,
  ) => void,
): DashboardOperationController {
  return {
    start,
    update,
  }
}
