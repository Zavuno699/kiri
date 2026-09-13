import {
  transportApiRequest,
} from "../../../../application/api/runtime/canonicalApiTransport";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function sendSecurityControl<
  TResult = unknown,
>(
  body: unknown,
): Promise<TResult> {
  requireCapability(
    "security.control",
  );

  const response =
    await transportApiRequest<TResult>({
      method: "POST",
      path:
        "/api/v1/security/control",
      body,
      capability:
        "security.control",
    });

  return response.data as TResult;
}
