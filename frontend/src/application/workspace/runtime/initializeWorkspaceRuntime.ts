import {
  registerCanonicalWorkspaceDomains,
} from "../registry/registerWorkspaceDomains";

import {
  registerCanonicalWorkspaceActions,
} from "../registry/registerWorkspaceActions";

import {
  buildCanonicalWorkspaceQueues,
} from "../queues/buildWorkspaceQueues";

import {
  updateWorkspaceState,
} from "../state/workspaceStore";

export function initializeWorkspaceRuntime(): void {
  registerCanonicalWorkspaceDomains();
  registerCanonicalWorkspaceActions();
  buildCanonicalWorkspaceQueues();

  updateWorkspaceState({
    workspaceStatus:
      "ready",
  });
}
