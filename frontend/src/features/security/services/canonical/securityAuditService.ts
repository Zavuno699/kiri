import {
  canonicalResourceClient,
} from "../../../../application/api/canonical/client/canonicalResourceClient";

export async function listSecurityEvents() {
  return canonicalResourceClient.list<
    Record<string, unknown>
  >(
    "/api/v1/security/events",
    {
      principal: null,
      sessionId: null,
      correlationId: null,
      capability:
        "security.read",
    },
  );
}
