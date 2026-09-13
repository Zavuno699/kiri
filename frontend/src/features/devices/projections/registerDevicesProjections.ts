import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export function registerDevicesProjections(): void {
  createDomainProjection(
    "devices",
    "devices",
    [],
  );
}
