import { runtimeRBACAllows } from "../../rbac/runtime/rbacRuntimeBridge";
import { isAuthenticated } from "../../authentication/guards/isAuthenticated";
import type { OperatorNavigationItem } from "../navigationItem";

export interface NavigationVisibility {
  visible: boolean;
  reason: string;
}

export function evaluateNavigationVisibility(
  item: OperatorNavigationItem,
): NavigationVisibility {
  if (!item.active) {
    return {
      visible: false,
      reason: "inactive",
    };
  }

  if (
    item.requiresAuthentication &&
    !isAuthenticated()
  ) {
    return {
      visible: false,
      reason: "authentication-required",
    };
  }

  if (
    item.capability &&
    !runtimeRBACAllows(item.capability)
  ) {
    return {
      visible: false,
      reason: "capability-denied",
    };
  }

  return {
    visible: true,
    reason: "authorized",
  };
}
