import {
  transportApiRequest,
} from "./canonicalApiTransport";

import {
  requireCapability,
} from "../../security/guards/requireCapability";

export async function sendCanonicalCommand<
  TResult = unknown,
>(
  body: unknown,
  capability: string,
) {
  requireCapability(
    capability,
  );

  return transportApiRequest<TResult>({
    method: "POST",
    path:
      "/api/v1/command",
    body,
    capability,
  });
}
