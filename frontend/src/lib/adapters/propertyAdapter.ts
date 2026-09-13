import type {
  PropertyRecord,
} from "../../features/properties/types/property"
import {
  normalizeStatus,
} from "../normalization/status"
import {
  normalizeNumber,
} from "../normalization/number"

export function adaptProperty(
  input: Record<string, unknown>,
): PropertyRecord {
  return {
    id: String(input.id ?? ""),
    name: String(input.name ?? "Unnamed property"),
    status:
      normalizeStatus(input.status) as PropertyRecord["status"],
    occupancy:
      normalizeStatus(input.occupancy) as PropertyRecord["occupancy"],
    units:
      normalizeNumber(input.units) ?? 0,
    occupiedUnits:
      normalizeNumber(input.occupiedUnits) ??
      normalizeNumber(input.occupied_units) ??
      0,
    availableUnits:
      normalizeNumber(input.availableUnits) ??
      normalizeNumber(input.available_units) ??
      0,
  }
}
