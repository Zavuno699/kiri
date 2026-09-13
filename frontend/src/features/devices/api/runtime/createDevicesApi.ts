import {
  devicesResourceAdapter,
} from "../canonical/devicesResourceAdapter";

export async function createDevicesApi<
  TBody = unknown,
  TResult = unknown,
>(
  body: TBody,
) {
  return devicesResourceAdapter.create<
    TBody,
    TResult
  >(body);
}
