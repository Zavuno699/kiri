import { finalRouteSurface } from "./finalRouteSurface";

export function resolveFinalRoute(
  path: string,
) {
  return finalRouteSurface.find(
    (route) =>
      path === route.path ||
      path.startsWith(`${route.path}/`),
  );
}
