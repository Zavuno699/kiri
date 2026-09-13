export interface LeaseListBinding {
  items: unknown[]
  total: number
  loading: boolean
  refreshing: boolean
}

export const emptyLeaseListBinding:
  LeaseListBinding = {
  items: [],
  total: 0,
  loading: false,
  refreshing: false,
}
