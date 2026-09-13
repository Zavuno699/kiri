import type {
  ResourceStore,
} from "../stores/resourceStore"

export interface ResourceController<T> {
  load(): Promise<T[]>
  select(id?: string): void
  state(): ReturnType<ResourceStore<T>["getState"]>
}

export function createResourceController<T>(
  store: ResourceStore<T>,
  loader: () => Promise<T[]>,
): ResourceController<T> {
  return {
    async load() {
      store.setLoading(true)
      store.setError(undefined)

      try {
        const items = await loader()
        store.setItems(items)
        return items
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Resource loading failed."

        store.setError(message)
        throw error
      } finally {
        store.setLoading(false)
      }
    },

    select(id) {
      store.setSelectedId(id)
    },

    state() {
      return store.getState()
    },
  }
}
