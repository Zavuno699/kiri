import { OPERATOR_ACTION_CATALOG } from "../actionCatalog";
import { filterVisibleActions } from "../visibility/filterVisibleActions";
import {
  getOperatorActionState,
  setOperatorActionState,
} from "../state/actionStore";

export function initializeOperatorActions(): void {
  setOperatorActionState({
    initialized: true,
    actions: OPERATOR_ACTION_CATALOG,
    visibleActions: filterVisibleActions(
      OPERATOR_ACTION_CATALOG,
    ),
  });
}

export function refreshOperatorActions(): void {
  initializeOperatorActions();
}

export function operatorActionsReady(): boolean {
  return getOperatorActionState().initialized;
}
