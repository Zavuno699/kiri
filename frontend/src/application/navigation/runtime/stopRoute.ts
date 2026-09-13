import {
  updateRouteRuntimeState,
} from "../state/routeRuntimeStore";

export function stopRoute(
  route: string,
): void {
  updateRouteRuntimeState(
    route,
    {
      active: false,
    },
  );
}
