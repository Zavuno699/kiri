import { canonicalRoutes } from "../canonical/canonicalRoutes";
import { activeRoutes } from "../../application/navigation/activation/routes/activeRoutes";

export function getRouteDiagnostics() {
  const canonicalPaths = new Set(
    canonicalRoutes.map(
      (route) => route.path,
    ),
  );

  const activePaths = new Set(
    activeRoutes
      .filter((route) => route.enabled)
      .map((route) => route.route),
  );

  const missingFromActive = canonicalRoutes
    .filter(
      (route) =>
        !activePaths.has(route.path),
    )
    .map((route) => route.path);

  const unknownActive = activeRoutes
    .filter(
      (route) =>
        !canonicalPaths.has(route.route),
    )
    .map((route) => route.route);

  return {
    canonicalCount:
      canonicalRoutes.length,
    activeCount:
      activeRoutes.filter(
        (route) => route.enabled,
      ).length,
    missingFromActive,
    unknownActive,
  };
}
