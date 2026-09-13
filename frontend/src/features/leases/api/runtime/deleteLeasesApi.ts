import {
  leasesResourceAdapter,
} from "../canonical/leasesResourceAdapter";

export async function deleteLeasesApi<
  TResult = unknown,
>(
  id: string,
) {
  return leasesResourceAdapter.remove<TResult>(
    id,
  );
}
