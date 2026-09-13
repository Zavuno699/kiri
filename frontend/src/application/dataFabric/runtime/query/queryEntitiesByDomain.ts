import {
  listEntities,
} from "../../entities/entityStore";

export function queryEntitiesByDomain(
  domain: string,
) {
  return listEntities().filter(
    (entity) =>
      entity.domain ===
      domain,
  );
}
