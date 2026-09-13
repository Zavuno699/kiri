import {
  CANONICAL_ROUTE_LIST,
} from "./canonicalRouteList";

export function isCanonicalRoute(
  route: string,
): boolean {
  return CANONICAL_ROUTE_LIST.includes(
    route as
      (typeof CANONICAL_ROUTE_LIST)[number],
  );
}
