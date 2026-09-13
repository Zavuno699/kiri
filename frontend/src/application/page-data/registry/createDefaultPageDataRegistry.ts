import {
  createPageDataRegistry,
} from "./pageDataRegistry"
import {
  pageDataRoutes,
} from "../navigation/pageDataRoutes"

export function createDefaultPageDataRegistry() {
  const registry =
    createPageDataRegistry()

  for (const route of pageDataRoutes) {
    registry.register({
      id: route.id,
      domain: route.domain,
      route: route.path,
      listSupported:
        route.page === "list" ||
        route.page === "workspace",
      detailSupported:
        route.page === "detail",
      refreshSupported: route.enabled,
    })
  }

  return registry
}
