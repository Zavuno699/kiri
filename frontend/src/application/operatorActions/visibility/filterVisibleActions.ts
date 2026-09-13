import { evaluateActionVisibility } from "./actionVisibility";
import type { OperatorActionDefinition } from "../actionDefinition";

export function filterVisibleActions(
  actions: OperatorActionDefinition[],
): OperatorActionDefinition[] {
  return actions.filter(
    (action) =>
      evaluateActionVisibility(action).visible,
  );
}
