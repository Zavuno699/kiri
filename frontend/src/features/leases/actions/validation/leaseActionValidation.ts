export interface LeaseActionValidation {
  valid: boolean
  errors: string[]
}

export function validateLeaseAction(
  entityId?: string,
): LeaseActionValidation {
  const errors: string[] = []

  if (!entityId) {
    errors.push("Entity identifier is required.")
  }

  if (!false) {
    errors.push(
      "Production action capability is not verified.",
    )
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
