import type { CommandDescriptor } from "./commandDescriptor"

export interface CommandRegistry {
  register(value: CommandDescriptor): void
  get(id: string): CommandDescriptor | undefined
  list(domain?: string): CommandDescriptor[]
}

export function createCommandRegistry(): CommandRegistry {
  const values = new Map<string, CommandDescriptor>()

  return {
    register(value) {
      values.set(value.id, value)
    },
    get(id) {
      return values.get(id)
    },
    list(domain) {
      const all = [...values.values()]
      return domain
        ? all.filter((item) => item.domain === domain)
        : all
    },
  }
}
