import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export function registerLeasesProjections(): void {
  createDomainProjection(
    "leases",
    "leases",
    [],
  );
}
