import {
  canonicalResourceClient,
} from "../../../../application/api/canonical/client/canonicalResourceClient";

export async function sendDeviceCommand(
  request: {
    deviceId: string;
    command: string;
    payload?: Record<string, unknown>;
  },
) {
  return canonicalResourceClient.command(
    "/api/v1/command",
    request,
    {
      principal: null,
      sessionId: null,
      correlationId: null,
      capability:
        "devices.command",
    },
  );
}
