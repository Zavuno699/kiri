import { canonicalRoutes } from "./canonical/canonicalRoutes";

export const routeMap = Object.fromEntries(
  canonicalRoutes.map((route) => [
    route.id,
    route.path,
  ]),
) as Record<string, string>;

export { canonicalRoutes };
