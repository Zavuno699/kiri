import {
  devicesResourceAdapter,
} from "../canonical/devicesResourceAdapter";

export async function deleteDevicesApi<
  TResult = unknown,
>(
  id: string,
) {
  return devicesResourceAdapter.remove<TResult>(
    id,
  );
}
