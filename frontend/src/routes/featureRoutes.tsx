import { canonicalRoutes } from "./canonical/canonicalRoutes";

export const featureRoutes = {
  dashboard: canonicalRoutes.find(
    (route) => route.id === "dashboard",
  ),
  property: canonicalRoutes.find(
    (route) => route.id === "properties",
  ),
  lease: canonicalRoutes.find(
    (route) => route.id === "leases",
  ),
  payment: canonicalRoutes.find(
    (route) => route.id === "payments",
  ),
  device: canonicalRoutes.find(
    (route) => route.id === "devices",
  ),
  lock: canonicalRoutes.find(
    (route) => route.id === "locks",
  ),
  security: canonicalRoutes.find(
    (route) => route.id === "security",
  ),
};
