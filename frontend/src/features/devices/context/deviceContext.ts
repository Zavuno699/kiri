export interface DeviceContext {
  domain: "devices"
  entityId?: string
  correlationId?: string
  readOnly: boolean
}

export function createDeviceContext(
  entityId?: string,
): DeviceContext {
  return {
    domain: "devices",
    entityId,
    readOnly: true,
  }
}
