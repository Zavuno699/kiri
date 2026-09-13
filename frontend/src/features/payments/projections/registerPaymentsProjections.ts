import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export function registerPaymentsProjections(): void {
  createDomainProjection(
    "payments",
    "payments",
    [],
  );
}
