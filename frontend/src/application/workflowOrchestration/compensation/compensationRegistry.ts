import type {
  CompensationAction,
} from "../contracts/compensationAction";

const actions = new Map<
  string,
  CompensationAction
>();

export function registerCompensationAction(
  action: CompensationAction,
): void {
  actions.set(
    action.id,
    action,
  );
}

export function getCompensationAction(
  id: string,
): CompensationAction | null {
  return (
    actions.get(
      id,
    ) ??
    null
  );
}

export function listCompensationActions(): CompensationAction[] {
  return [
    ...actions.values(),
  ];
}

export function listCompensationForWorkflow(
  workflowId: string,
): CompensationAction[] {
  return listCompensationActions().filter(
    (action) =>
      action.workflowId ===
      workflowId,
  );
}
