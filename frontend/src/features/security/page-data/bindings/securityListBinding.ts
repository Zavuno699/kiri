export interface SecurityListBinding {
  items: unknown[]
  total: number
  loading: boolean
  refreshing: boolean
}

export const emptySecurityListBinding:
  SecurityListBinding = {
  items: [],
  total: 0,
  loading: false,
  refreshing: false,
}
