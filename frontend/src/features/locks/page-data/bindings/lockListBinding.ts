export interface LockListBinding {
  items: unknown[]
  total: number
  loading: boolean
  refreshing: boolean
}

export const emptyLockListBinding:
  LockListBinding = {
  items: [],
  total: 0,
  loading: false,
  refreshing: false,
}
