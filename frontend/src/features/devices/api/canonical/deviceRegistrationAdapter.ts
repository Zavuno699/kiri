import {
  transportApiRequest,
} from "../../../../application/api/runtime/canonicalApiTransport";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function registerDevice<
  TResult = unknown,
>(
  body: unknown,
): Promise<TResult> {
  requireCapability(
    "devices.write",
  );

  const response =
    await transportApiRequest<TResult>({
      method: "POST",
      path:
        "/api/v1/register",
      body,
      capability:
        "devices.write",
    });

  return response.data as TResult;
}
