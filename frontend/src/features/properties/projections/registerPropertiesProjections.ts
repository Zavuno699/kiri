import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export function registerPropertiesProjections(): void {
  createDomainProjection(
    "properties",
    "properties",
    [],
  );
}
