import {
  findRelatedEntities,
} from "../../../application/dataFabric/runtime/findRelatedEntities";

export function selectPropertiesRelationships(
  entityId: string,
) {
  return findRelatedEntities(
    entityId,
  );
}
