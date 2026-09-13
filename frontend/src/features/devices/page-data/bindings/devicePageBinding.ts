export interface DevicePageBinding<T = unknown> {
  pageId: string
  domain: "devices"
  route: string
  data?: T
  loading: boolean
  error?: string
}

export function createDevicePageBinding<T>(
  pageId: string,
  route: string,
): DevicePageBinding<T> {
  return {
    pageId,
    domain: "devices",
    route,
    loading: false,
  }
}
