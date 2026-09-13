import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export function registerSecurityProjections(): void {
  createDomainProjection(
    "security",
    "security",
    [],
  );
}
