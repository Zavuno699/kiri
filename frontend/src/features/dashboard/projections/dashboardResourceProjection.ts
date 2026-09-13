import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export const dashboardResourceProjection =
  createDomainProjection(
    "dashboard",
    "dashboard",
    [],
  );
