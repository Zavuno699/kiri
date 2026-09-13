import type { PropertyCommandType } from "./propertyCommandTypes"

export interface PropertyCommand {
  type: PropertyCommandType
  propertyId?: string
}

export function createPropertyCommand(
  type: PropertyCommandType,
  propertyId?: string,
): PropertyCommand {
  return {
    type,
    propertyId,
  }
}
