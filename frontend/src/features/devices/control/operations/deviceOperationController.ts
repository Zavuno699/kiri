import type { OperationRecord } from "../../../../application/control/operations/operationRecord"

export interface DeviceOperationController {
  start(type: string, id?: string): OperationRecord
  update(
    operationId: string,
    patch: Partial<OperationRecord>,
  ): void
}

export function createDeviceOperationController(
  start: (
    type: string,
    id?: string,
  ) => OperationRecord,
  update: (
    id: string,
    patch: Partial<OperationRecord>,
  ) => void,
): DeviceOperationController {
  return {
    start,
    update,
  }
}
