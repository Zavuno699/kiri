import {
  leasesResourceAdapter,
} from "../canonical/leasesResourceAdapter";

export async function updateLeasesApi<
  TBody = unknown,
  TResult = unknown,
>(
  id: string,
  body: TBody,
) {
  return leasesResourceAdapter.update<
    TBody,
    TResult
  >(
    id,
    body,
  );
}
