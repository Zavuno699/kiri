import {
  activeRoutes,
} from "../../application/navigation/activation/routes/activeRoutes"

export function runtimeRouteActivation(
  path: string,
) {
  return activeRoutes.find(
    (route) =>
      route.route === path &&
      route.enabled,
  )
}
