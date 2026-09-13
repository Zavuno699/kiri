import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export function registerLocksProjections(): void {
  createDomainProjection(
    "locks",
    "locks",
    [],
  );
}
