import type {
  EntityReference,
} from "../contracts/entityReference";

const types = new Map<
  string,
  EntityReference
>();

export function registerEntityType(
  reference: EntityReference,
): void {
  if (reference.type) {
    types.set(
      reference.type,
      reference,
    );
  }
}

export function getEntityType(
  type: string,
): EntityReference | null {
  return (
    types.get(type) ??
    null
  );
}

export function listEntityTypes(): EntityReference[] {
  return [
    ...types.values(),
  ];
}
