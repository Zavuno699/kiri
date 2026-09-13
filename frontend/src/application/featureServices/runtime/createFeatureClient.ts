import type { ResourceClient } from "../../resources/clients/resourceClient"

export function createFeatureClient<T>(
  basePath: string,
): ResourceClient<T> {
  return {
    async list() {
      const response = await fetch(basePath)
      if (!response.ok) throw new Error(`GET ${basePath} failed: ${response.status}`)
      return (await response.json()) as T[]
    },

    async get(id: string) {
      const response = await fetch(`${basePath}/${encodeURIComponent(id)}`)
      if (response.status === 404) return undefined
      if (!response.ok) {
        throw new Error(`GET ${basePath}/${id} failed: ${response.status}`)
      }
      return (await response.json()) as T
    },
  }
}
