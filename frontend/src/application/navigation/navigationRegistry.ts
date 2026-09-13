import type { NavigationEntry } from "./navigationEntry"

export interface NavigationRegistry {
  register(entry: NavigationEntry): void
  list(): NavigationEntry[]
  resolve(path: string): NavigationEntry | undefined
}

export function createNavigationRegistry(): NavigationRegistry {
  const values = new Map<string, NavigationEntry>()

  return {
    register(entry) {
      values.set(entry.id, entry)
    },

    list() {
      return [...values.values()].sort(
        (a, b) => a.order - b.order,
      )
    },

    resolve(path) {
      return [...values.values()].find(
        (entry) => entry.path === path,
      )
    },
  }
}
