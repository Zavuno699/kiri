const memory = new Map<string, string>()

export const storageService = {
  get(key: string): string | null {
    if (
      typeof window !== "undefined" &&
      window.localStorage
    ) {
      return window.localStorage.getItem(key)
    }

    return memory.get(key) ?? null
  },

  set(key: string, value: string): void {
    if (
      typeof window !== "undefined" &&
      window.localStorage
    ) {
      window.localStorage.setItem(key, value)
      return
    }

    memory.set(key, value)
  },

  remove(key: string): void {
    if (
      typeof window !== "undefined" &&
      window.localStorage
    ) {
      window.localStorage.removeItem(key)
      return
    }

    memory.delete(key)
  },
}
