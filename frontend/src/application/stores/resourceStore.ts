export interface ResourceState<T> {
  items: T[]
  selectedId?: string
  loading: boolean
  initialized: boolean
  error?: string
  lastUpdatedAt?: string
}

export interface ResourceStore<T> {
  getState(): ResourceState<T>
  setItems(items: T[]): void
  setSelectedId(id?: string): void
  setLoading(value: boolean): void
  setError(message?: string): void
  reset(): void
}

export function createResourceStore<T>():
  ResourceStore<T> {
  let state: ResourceState<T> = {
    items: [],
    loading: false,
    initialized: false,
  }

  return {
    getState() {
      return {
        ...state,
        items: [...state.items],
      }
    },

    setItems(items) {
      state = {
        ...state,
        items: [...items],
        initialized: true,
        error: undefined,
        lastUpdatedAt:
          new Date().toISOString(),
      }
    },

    setSelectedId(id) {
      state = {
        ...state,
        selectedId: id,
      }
    },

    setLoading(value) {
      state = {
        ...state,
        loading: value,
      }
    },

    setError(message) {
      state = {
        ...state,
        error: message,
      }
    },

    reset() {
      state = {
        items: [],
        loading: false,
        initialized: false,
      }
    },
  }
}
