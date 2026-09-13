import {
  queryRelationships,
} from "../../dataFabric/runtime/query/queryRelationships";

import type {
  OperationalRelationshipView,
} from "../contracts/operationalRelationshipView";

export function selectEntityRelationships(
  entityId: string,
): OperationalRelationshipView[] {
  return queryRelationships(
    entityId,
  ).map(
    (relationship) => ({
      id:
        relationship.id,
      sourceId:
        relationship.source.id,
      sourceType:
        relationship.source.type,
      targetId:
        relationship.target.id,
      targetType:
        relationship.target.type,
      relationship:
        relationship.type,
      required:
        relationship.required,
      active:
        relationship.active,
    }),
  );
}
