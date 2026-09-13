import {
  leasesResourceAdapter,
} from "../canonical/leasesResourceAdapter";

export async function listLeasesApi<T = unknown>() {
  return leasesResourceAdapter.list<T>();
}
