import type {
  WorkspaceAction,
} from "../contracts/workspaceAction";

const actions =
  new Map<string, WorkspaceAction[]>();

export function registerWorkspaceActions(
  domain: string,
  next: WorkspaceAction[],
): void {
  actions.set(
    domain,
    next,
  );
}

export function getWorkspaceActions(
  domain: string,
): WorkspaceAction[] {
  return (
    actions.get(domain) ??
    []
  );
}

export function listWorkspaceActionDomains(): string[] {
  return [
    ...actions.keys(),
  ];
}
