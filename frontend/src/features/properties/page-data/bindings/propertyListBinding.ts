export interface PropertyListBinding {
  items: unknown[]
  total: number
  loading: boolean
  refreshing: boolean
}

export const emptyPropertyListBinding:
  PropertyListBinding = {
  items: [],
  total: 0,
  loading: false,
  refreshing: false,
}
