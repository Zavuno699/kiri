import type {
  DeviceRecord,
} from "../../features/devices/types/device"
import {
  normalizeNumber,
} from "../normalization/number"
import {
  normalizeStatus,
} from "../normalization/status"

export function adaptDevice(
  input: Record<string, unknown>,
): DeviceRecord {
  return {
    id: String(input.id ?? ""),
    name:
      String(
        input.name ??
          input.serialNumber ??
          input.serial_number ??
          "Device",
      ),
    serialNumber:
      typeof input.serialNumber === "string"
        ? input.serialNumber
        : typeof input.serial_number === "string"
          ? input.serial_number
          : undefined,
    propertyId:
      typeof input.propertyId === "string"
        ? input.propertyId
        : typeof input.property_id === "string"
          ? input.property_id
          : undefined,
    lockId:
      typeof input.lockId === "string"
        ? input.lockId
        : typeof input.lock_id === "string"
          ? input.lock_id
          : undefined,
    connectionStatus:
      normalizeStatus(
        input.connectionStatus ??
          input.connection_status ??
          input.status,
      ) as DeviceRecord["connectionStatus"],
    healthStatus:
      normalizeStatus(
        input.healthStatus ??
          input.health_status,
      ) as DeviceRecord["healthStatus"],
    batteryPercent:
      normalizeNumber(
        input.batteryPercent ??
          input.battery_percent,
      ),
    firmwareVersion:
      typeof input.firmwareVersion === "string"
        ? input.firmwareVersion
        : typeof input.firmware_version === "string"
          ? input.firmware_version
          : undefined,
    lastSeenAt:
      typeof input.lastSeenAt === "string"
        ? input.lastSeenAt
        : typeof input.last_seen_at === "string"
          ? input.last_seen_at
          : undefined,
    createdAt:
      typeof input.createdAt === "string"
        ? input.createdAt
        : typeof input.created_at === "string"
          ? input.created_at
          : undefined,
  }
}
