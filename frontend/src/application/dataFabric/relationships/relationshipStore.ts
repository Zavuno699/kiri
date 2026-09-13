import type {
  EntityRelationship,
} from "../contracts/entityRelationship";

const relationships = new Map<
  string,
  EntityRelationship
>();

export function registerRelationship(
  relationship: EntityRelationship,
): void {
  relationships.set(
    relationship.id,
    relationship,
  );
}

export function getRelationship(
  id: string,
): EntityRelationship | null {
  return (
    relationships.get(id) ??
    null
  );
}

export function listRelationships(): EntityRelationship[] {
  return [
    ...relationships.values(),
  ];
}

export function findOutgoingRelationships(
  entityId: string,
): EntityRelationship[] {
  return listRelationships().filter(
    (relationship) =>
      relationship.source.id ===
      entityId,
  );
}

export function findIncomingRelationships(
  entityId: string,
): EntityRelationship[] {
  return listRelationships().filter(
    (relationship) =>
      relationship.target.id ===
      entityId,
  );
}
