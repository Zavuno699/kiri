import type { RegistrationResult } from "./registrationResult"

export interface RegistrationRegistry {
  register(result: RegistrationResult): void
  list(): RegistrationResult[]
  get(id: string): RegistrationResult | undefined
}

export function createRegistrationRegistry(): RegistrationRegistry {
  const values = new Map<string, RegistrationResult>()

  return {
    register(result) {
      values.set(result.id, result)
    },

    list() {
      return [...values.values()]
    },

    get(id) {
      return values.get(id)
    },
  }
}
