import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export const paymentsResourceProjection =
  createDomainProjection(
    "payments",
    "payments",
    [],
  );
