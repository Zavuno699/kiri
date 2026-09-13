import {
  listRelationships,
} from "../../relationships/relationshipStore";

export function queryRelationships(
  entityId?: string,
) {
  if (!entityId) {
    return listRelationships();
  }

  return listRelationships().filter(
    (relationship) =>
      relationship.source.id ===
        entityId ||
      relationship.target.id ===
        entityId,
  );
}
