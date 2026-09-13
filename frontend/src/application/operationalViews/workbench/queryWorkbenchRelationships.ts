import {
  selectEntityRelationships,
} from "../selectors/selectEntityRelationships";

export function queryWorkbenchRelationships(
  entityId: string,
) {
  return selectEntityRelationships(
    entityId,
  );
}
