export interface LockPageBinding<T = unknown> {
  pageId: string
  domain: "locks"
  route: string
  data?: T
  loading: boolean
  error?: string
}

export function createLockPageBinding<T>(
  pageId: string,
  route: string,
): LockPageBinding<T> {
  return {
    pageId,
    domain: "locks",
    route,
    loading: false,
  }
}
