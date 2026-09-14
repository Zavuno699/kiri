import {
  findRelatedEntities,
} from "../../../../application/dataFabric/runtime/findRelatedEntities";

export function selectDashboardRelationships(
  entityId: string,
) {
  return findRelatedEntities({
    type: "dashboard",
    id: entityId,
  });
}
