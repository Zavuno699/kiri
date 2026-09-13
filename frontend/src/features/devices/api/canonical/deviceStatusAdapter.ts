import {
  transportApiRequest,
} from "../../../../application/api/runtime/canonicalApiTransport";

export async function getDeviceStatus<
  TResult = unknown,
>(): Promise<TResult> {
  const response =
    await transportApiRequest<TResult>({
      method: "GET",
      path:
        "/api/v1/status",
      capability:
        "devices.read",
    });

  return response.data as TResult;
}
