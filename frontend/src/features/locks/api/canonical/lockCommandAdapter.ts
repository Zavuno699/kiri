import {
  transportApiRequest,
} from "../../../../application/api/runtime/canonicalApiTransport";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function sendLockCommand<
  TResult = unknown,
>(
  lockId: string,
  body: unknown,
): Promise<TResult> {
  requireCapability(
    "locks.command",
  );

  const response =
    await transportApiRequest<TResult>({
      method: "POST",
      path:
        `/api/v1/locks/${lockId}/command`,
      body,
      capability:
        "locks.command",
    });

  return response.data as TResult;
}
