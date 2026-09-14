import { createPageRegistry } from "./pageRegistry"
import { pageDataRoutes } from "../../page-data/navigation/pageDataRoutes"

export function createDefaultPageRegistry() {
  const registry = createPageRegistry()

  for (const route of pageDataRoutes) {
    const pageKind =
      route.page === "overview"
        ? "overview"
        : route.page === "workspace"
          ? "workspace"
          : route.page as "list" | "detail"

    registry.register({
      id: route.id,
      domain: route.domain,
      route: route.path,
      kind: pageKind,
      enabled: route.enabled,
      readOnly: true,
    })
  }

  return registry
}
