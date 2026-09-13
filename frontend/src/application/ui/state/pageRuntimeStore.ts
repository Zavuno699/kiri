export interface PageRuntimeState {
  pageId: string
  loading: boolean
  ready: boolean
  stale: boolean
  error: string | null
}

const states = new Map<string, PageRuntimeState>()

export function setPageRuntimeState(
  state: PageRuntimeState,
): PageRuntimeState {
  states.set(state.pageId, { ...state })
  return state
}

export function registerPageRuntime(
  state: PageRuntimeState,
): PageRuntimeState {
  return setPageRuntimeState(state)
}

export function listPageRuntimeStates(): PageRuntimeState[] {
  return [...states.values()]
}
