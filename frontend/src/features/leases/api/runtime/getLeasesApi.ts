import {
  leasesResourceAdapter,
} from "../canonical/leasesResourceAdapter";

export async function getLeasesApi<T = unknown>(
  id: string,
) {
  return leasesResourceAdapter.get<T>(
    id,
  );
}
