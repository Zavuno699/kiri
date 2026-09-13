import { runtimeRBACAllows } from "../../rbac/runtime/rbacRuntimeBridge";
import { canMutate } from "../../authentication/guards/canMutate";
import type { OperatorActionDefinition } from "../actionDefinition";

export interface ActionVisibility {
  visible: boolean;
  enabled: boolean;
  reason: string;
}

export function evaluateActionVisibility(
  action: OperatorActionDefinition,
): ActionVisibility {
  if (!action.active) {
    return {
      visible: false,
      enabled: false,
      reason: "inactive",
    };
  }

  if (!runtimeRBACAllows(action.capability)) {
    return {
      visible: false,
      enabled: false,
      reason: "capability-denied",
    };
  }

  if (action.mutating && !canMutate()) {
    return {
      visible: true,
      enabled: false,
      reason: "mutation-restricted",
    };
  }

  return {
    visible: true,
    enabled: true,
    reason: "authorized",
  };
}
