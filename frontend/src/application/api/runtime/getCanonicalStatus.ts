import {
  transportApiRequest,
} from "./canonicalApiTransport";

export async function getCanonicalStatus<
  TResult = unknown,
>() {
  return transportApiRequest<TResult>({
    method: "GET",
    path:
      "/api/v1/status",
    capability:
      "dashboard.read",
  });
}
