import {
  transportApiRequest,
} from "../../../../application/api/runtime/canonicalApiTransport";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function getSecurityEvents<
  TResult = unknown,
>(): Promise<TResult> {
  requireCapability(
    "security.read",
  );

  const response =
    await transportApiRequest<TResult>({
      method: "GET",
      path:
        "/api/v1/security/events",
      capability:
        "security.read",
    });

  return response.data as TResult;
}
