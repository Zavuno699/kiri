import type { OperatorActionDefinition } from "../actionDefinition";

const registry = new Map<string, OperatorActionDefinition>();

export function registerOperatorAction(
  action: OperatorActionDefinition,
): void {
  registry.set(action.key, action);
}

export function getOperatorAction(
  key: string,
): OperatorActionDefinition | null {
  return registry.get(key) ?? null;
}

export function listOperatorActions(): OperatorActionDefinition[] {
  return [...registry.values()];
}
