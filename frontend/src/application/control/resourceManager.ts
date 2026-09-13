import type { ResourceHandle } from "./resourceHandle"

const resources = new Map<string, ResourceHandle<unknown>>()

export interface ResourceManager {
  register<T>(key: string): ResourceHandle<T>
  get<T>(key: string): ResourceHandle<T> | undefined
  set<T>(key: string, value: Partial<ResourceHandle<T>>): ResourceHandle<T>
}

export const resourceManager: ResourceManager = {
  register<T>(key: string): ResourceHandle<T> {
    const existing = resources.get(key)
    if (existing) return existing as ResourceHandle<T>

    const handle: ResourceHandle<T> = {
      key,
      version: 1,
      active: true,
      lifecycle: "idle",
    }

    resources.set(key, handle as ResourceHandle<unknown>)
    return handle
  },

  get<T>(key: string): ResourceHandle<T> | undefined {
    return resources.get(key) as ResourceHandle<T> | undefined
  },

  set<T>(key: string, value: Partial<ResourceHandle<T>>): ResourceHandle<T> {
    const current =
      (resources.get(key) as ResourceHandle<T> | undefined) ??
      this.register<T>(key)

    const next: ResourceHandle<T> = {
      ...current,
      ...value,
      key,
      version:
        typeof value.version === "number"
          ? value.version
          : current.version + 1,
    }

    resources.set(key, next as ResourceHandle<unknown>)
    return next
  },
}
