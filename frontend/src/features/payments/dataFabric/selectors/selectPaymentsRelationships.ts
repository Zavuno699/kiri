import {
  findRelatedEntities,
} from "../../../../application/dataFabric/runtime/findRelatedEntities";

export function selectPaymentsRelationships(
  entityId: string,
) {
  return findRelatedEntities({
    type: "payments",
    id: entityId,
  });
}
