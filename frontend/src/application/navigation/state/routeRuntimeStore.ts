import type {
  RouteRuntimeState,
} from "../contracts/routeRuntimeState";

const states = new Map<
  string,
  RouteRuntimeState
>();

export function registerRouteRuntime(
  state: RouteRuntimeState,
): void {
  states.set(
    state.route,
    state,
  );
}

export function getRouteRuntimeState(
  route: string,
): RouteRuntimeState | null {
  return (
    states.get(route) ??
    null
  );
}

export function updateRouteRuntimeState(
  route: string,
  patch: Partial<RouteRuntimeState>,
): void {
  const current =
    states.get(route);

  if (!current) {
    return;
  }

  states.set(
    route,
    {
      ...current,
      ...patch,
    },
  );
}

export function listRouteRuntimeStates(): RouteRuntimeState[] {
  return [
    ...states.values(),
  ];
}
