import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export const leasesResourceProjection =
  createDomainProjection(
    "leases",
    "leases",
    [],
  );
