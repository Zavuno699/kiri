import type {
  OperationalEntityView,
} from "../contracts/operationalEntityView";

const registry = new Map<
  string,
  OperationalEntityView
>();

export function registerOperationalEntity(
  entity: OperationalEntityView,
): void {
  registry.set(
    entity.id,
    entity,
  );
}

export function getOperationalEntity(
  id: string,
): OperationalEntityView | null {
  return (
    registry.get(id) ??
    null
  );
}

export function listOperationalEntities(): OperationalEntityView[] {
  return [
    ...registry.values(),
  ];
}

export function clearOperationalEntities(): void {
  registry.clear();
}
