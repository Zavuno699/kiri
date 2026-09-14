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
        relationship.source.type ?? relationship.source.domain,
      targetId:
        relationship.target.id,
      targetType:
        relationship.target.type ?? relationship.target.domain,
      relationship:
        relationship.type,
      required:
        relationship.required,
      active:
        relationship.active,
    }),
  );
}
