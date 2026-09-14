import {
  findRelatedEntities,
} from "../../../../application/dataFabric/runtime/findRelatedEntities";

export function selectDevicesRelationships(
  entityId: string,
) {
  return findRelatedEntities({
    type: "devices",
    id: entityId,
  });
}
