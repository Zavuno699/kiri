import {
  devicesResourceAdapter,
} from "../canonical/devicesResourceAdapter";

export async function updateDevicesApi<
  TBody = unknown,
  TResult = unknown,
>(
  id: string,
  body: TBody,
) {
  return devicesResourceAdapter.update<
    TBody,
    TResult
  >(
    id,
    body,
  );
}
