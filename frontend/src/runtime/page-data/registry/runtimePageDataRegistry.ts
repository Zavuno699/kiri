import {
  pageDataRoutes,
} from "../../../application/page-data/navigation/pageDataRoutes"

export function runtimePageDataRegistry() {
  return new Map(
    pageDataRoutes.map((route) => [
      route.id,
      route,
    ]),
  )
}
