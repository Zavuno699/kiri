import {
  updateWorkspaceState,
} from "../state/workspaceStore";

export function setWorkspaceCommandMode(
  mode:
    | "normal"
    | "command"
    | "recovery",
): void {
  updateWorkspaceState({
    commandMode:
      mode,
  });
}
