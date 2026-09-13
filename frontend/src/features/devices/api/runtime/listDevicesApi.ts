import {
  devicesResourceAdapter,
} from "../canonical/devicesResourceAdapter";

export async function listDevicesApi<T = unknown>() {
  return devicesResourceAdapter.list<T>();
}
