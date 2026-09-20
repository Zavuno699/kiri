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
    landlord_profile_id: String(input.landlord_profile_id ?? ""),
    property_name: String(input.property_name ?? "Unnamed property"),
    property_type: String(input.property_type ?? ""),
    address_line1: String(input.address_line1 ?? ""),
    address_line2: String(input.address_line2 ?? ""),
    city: String(input.city ?? ""),
    state: String(input.state ?? ""),
    postal_code: String(input.postal_code ?? ""),
    country: String(input.country ?? ""),
    timezone: String(input.timezone ?? ""),
    status:
      normalizeStatus(input.status) as PropertyRecord["status"],
    total_units: normalizeNumber(input.total_units) ?? 0,
    description: String(input.description ?? ""),
    created_at: String(input.created_at ?? ""),
    updated_at: String(input.updated_at ?? ""),
  }
}
