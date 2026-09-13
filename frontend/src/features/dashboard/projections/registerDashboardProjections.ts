import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export function registerDashboardProjections(): void {
  createDomainProjection(
    "dashboard",
    "dashboard",
    [],
  );
}
