import {
  transportApiRequest,
} from "../../../../application/api/runtime/canonicalApiTransport";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function sendDeviceCommand<
  TResult = unknown,
>(
  body: unknown,
): Promise<TResult> {
  requireCapability(
    "devices.command",
  );

  const response =
    await transportApiRequest<TResult>({
      method: "POST",
      path:
        "/api/v1/command",
      body,
      capability:
        "devices.command",
    });

  return response.data as TResult;
}
