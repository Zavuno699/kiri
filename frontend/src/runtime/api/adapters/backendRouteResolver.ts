import {
  backendRouteMap,
} from "../routes/backendRouteMap"

export function resolveBackendRoute(
  domain: string,
  method: string,
  path: string,
) {
  return backendRouteMap.find(
    (route) =>
      route.domain === domain &&
      route.method === method &&
      route.path === path,
  )
}
