import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export const devicesResourceProjection =
  createDomainProjection(
    "devices",
    "devices",
    [],
  );
