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
    type:
      "security",
    title:
      "Security state review",
    severity:
      "info",
    createdAt:
      now,
    requiresAction:
      false,
  });
}
