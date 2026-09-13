export type OperatorEntityType =
  | "property"
  | "lease"
  | "payment"
  | "device"
  | "lock"
  | "security"

export interface OperatorEntityReference {
  type: OperatorEntityType
  id: string
}

export function createEntityReference(
  type: OperatorEntityType,
  id: string,
): OperatorEntityReference {
  return {
    type,
    id: id.trim(),
  }
}
