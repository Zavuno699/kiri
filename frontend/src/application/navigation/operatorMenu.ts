import type { CanonicalRoute } from "../../routes/canonical/canonicalRoutes";
import { canonicalRoutes } from "../../routes/canonical/canonicalRoutes";

export const operatorMenu: CanonicalRoute[] =
  canonicalRoutes.filter(
    (route) =>
      route.kind === "workspace" ||
      route.id === "security",
  );
