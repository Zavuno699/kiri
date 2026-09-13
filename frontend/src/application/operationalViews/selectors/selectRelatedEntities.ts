import {
  findRelatedEntities,
} from "../../dataFabric/runtime/findRelatedEntities";

export function selectRelatedEntities(
  entityId: string,
) {
  return findRelatedEntities(
    entityId,
  );
}
