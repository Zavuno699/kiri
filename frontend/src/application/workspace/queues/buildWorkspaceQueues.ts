import {
  addWorkspaceQueueItem,
} from "./workspaceQueueStore";

export function buildCanonicalWorkspaceQueues(): void {
  const now =
    new Date().toISOString();

  addWorkspaceQueueItem({
    id:
      "operator-security-review",
    domain:
      "security",
    action:
      "security-review",
    createdAt:
      now,
  });
}
