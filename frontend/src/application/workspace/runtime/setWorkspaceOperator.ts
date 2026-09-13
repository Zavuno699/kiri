import {
  updateWorkspaceState,
} from "../state/workspaceStore";

export function setWorkspaceOperator(
  operatorId: string | null,
): void {
  updateWorkspaceState({
    operatorId,
  });
}
