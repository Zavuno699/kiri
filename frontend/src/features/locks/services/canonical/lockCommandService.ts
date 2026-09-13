import {
  canonicalResourceClient,
} from "../../../../application/api/canonical/client/canonicalResourceClient";

export async function sendLockCommand(
  request: {
    lockId: string;
    command: string;
    payload?: Record<string, unknown>;
  },
) {
  return canonicalResourceClient.command(
    `/api/v1/locks/${request.lockId}/command`,
    request,
    {
      principal: null,
      sessionId: null,
      correlationId: null,
      capability:
        "locks.command",
    },
  );
}
