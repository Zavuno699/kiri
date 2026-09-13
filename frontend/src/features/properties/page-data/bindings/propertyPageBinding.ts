export interface PropertyPageBinding<T = unknown> {
  pageId: string
  domain: "properties"
  route: string
  data?: T
  loading: boolean
  error?: string
}

export function createPropertyPageBinding<T>(
  pageId: string,
  route: string,
): PropertyPageBinding<T> {
  return {
    pageId,
    domain: "properties",
    route,
    loading: false,
  }
}
