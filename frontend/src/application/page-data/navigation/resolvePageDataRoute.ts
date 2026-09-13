import {
  pageDataRoutes,
} from "./pageDataRoutes"

export function resolvePageDataRoute(
  path: string,
) {
  return pageDataRoutes.find(
    (route) => route.path === path,
  )
}
