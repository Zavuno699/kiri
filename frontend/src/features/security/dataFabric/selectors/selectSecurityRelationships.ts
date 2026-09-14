import {
  findRelatedEntities,
} from "../../../../application/dataFabric/runtime/findRelatedEntities";

export function selectSecurityRelationships(
  entityId: string,
) {
  return findRelatedEntities({
    type: "security",
    id: entityId,
  });
}
