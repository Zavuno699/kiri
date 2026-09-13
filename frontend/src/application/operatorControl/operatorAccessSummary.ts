import {
  getRBACState,
} from "../rbac/state/rbacStore";

import {
  getOperatorNavigationState,
} from "../operatorNavigation/state/navigationStore";

import {
  getOperatorActionState,
} from "../operatorActions/state/actionStore";

export interface OperatorAccessSummary {
  roles: string[];
  capabilities: number;
  visibleNavigationItems: number;
  visibleActions: number;
}

export function getOperatorAccessSummary(): OperatorAccessSummary {
  const rbac = getRBACState();
  const navigation = getOperatorNavigationState();
  const actions = getOperatorActionState();

  return {
    roles: rbac.roles,
    capabilities: rbac.effectiveCapabilities.length,
    visibleNavigationItems:
      navigation.visibleItems.length,
    visibleActions:
      actions.visibleActions.length,
  };
}
