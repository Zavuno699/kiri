import {
  findRelatedEntities,
} from "../../../../application/dataFabric/runtime/findRelatedEntities";

export function selectLeasesRelationships(
  entityId: string,
) {
  return findRelatedEntities({
    type: "leases",
    id: entityId,
  });
}
