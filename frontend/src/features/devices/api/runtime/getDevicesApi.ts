import {
  devicesResourceAdapter,
} from "../canonical/devicesResourceAdapter";

export async function getDevicesApi<T = unknown>(
  id: string,
) {
  return devicesResourceAdapter.get<T>(
    id,
  );
}
