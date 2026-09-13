import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export const securityResourceProjection =
  createDomainProjection(
    "security",
    "security",
    [],
  );
