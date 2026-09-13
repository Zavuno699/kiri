import type { OperatorNavigationItem } from "../navigationItem";

const registry = new Map<string, OperatorNavigationItem>();

export function registerNavigationItem(
  item: OperatorNavigationItem,
): void {
  registry.set(item.key, item);
}

export function getNavigationItem(
  key: string,
): OperatorNavigationItem | null {
  return registry.get(key) ?? null;
}

export function listNavigationItems(): OperatorNavigationItem[] {
  return [...registry.values()];
}
