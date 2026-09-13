export interface RuntimeCacheState {
  warm: number
  stale: number
  refreshing: number
  invalidated: number
}

export const initialRuntimeCacheState:
  RuntimeCacheState = {
  warm: 0,
  stale: 0,
  refreshing: 0,
  invalidated: 0,
}
