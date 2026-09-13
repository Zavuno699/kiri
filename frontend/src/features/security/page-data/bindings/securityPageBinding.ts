export interface SecurityPageBinding<T = unknown> {
  pageId: string
  domain: "security"
  route: string
  data?: T
  loading: boolean
  error?: string
}

export function createSecurityPageBinding<T>(
  pageId: string,
  route: string,
): SecurityPageBinding<T> {
  return {
    pageId,
    domain: "security",
    route,
    loading: false,
  }
}
