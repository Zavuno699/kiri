import {
  findRelatedEntities,
} from "../../../application/dataFabric/runtime/findRelatedEntities";

export function selectLocksRelationships(
  entityId: string,
) {
  return findRelatedEntities(
    entityId,
  );
}
