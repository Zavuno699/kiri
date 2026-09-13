import {
  createDomainProjection,
} from "../../../application/projections/runtime/createDomainProjection";

export const propertiesResourceProjection =
  createDomainProjection(
    "properties",
    "properties",
    [],
  );
