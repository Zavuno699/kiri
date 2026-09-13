import { activeRoutes } from "../../navigation/activation/routes/activeRoutes";

export function createActiveRouteMap() {
  return new Map(
    activeRoutes
      .filter((route) => route.enabled)
      .map((route) => [
        route.route,
        route,
      ]),
  );
}
