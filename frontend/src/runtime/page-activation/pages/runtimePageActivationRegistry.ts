import {
  pageDataRoutes,
} from "../../application/page-data/navigation/pageDataRoutes"

export function createRuntimePageActivationRegistry() {
  return new Map(
    pageDataRoutes.map((route) => [
      route.id,
      {
        id: route.id,
        domain: route.domain,
        route: route.path,
        enabled: route.enabled,
      },
    ]),
  )
}
