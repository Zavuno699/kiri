import {
  securityResourceAdapter,
} from "../canonical/securityResourceAdapter";

export async function listSecurityApi<T = unknown>() {
  return securityResourceAdapter.list<T>();
}
