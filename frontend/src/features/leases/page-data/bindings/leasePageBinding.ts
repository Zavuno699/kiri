export interface LeasePageBinding<T = unknown> {
  pageId: string
  domain: "leases"
  route: string
  data?: T
  loading: boolean
  error?: string
}

export function createLeasePageBinding<T>(
  pageId: string,
  route: string,
): LeasePageBinding<T> {
  return {
    pageId,
    domain: "leases",
    route,
    loading: false,
  }
}
