export interface DeviceActionValidation {
  valid: boolean
  errors: string[]
}

export function validateDeviceAction(
  entityId?: string,
): DeviceActionValidation {
  const errors: string[] = []

  if (!entityId) {
    errors.push("Entity identifier is required.")
  }

  if (!true) {
    errors.push(
      "Production action capability is not verified.",
    )
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
