import {
  leasesResourceAdapter,
} from "../canonical/leasesResourceAdapter";

export async function createLeasesApi<
  TBody = unknown,
  TResult = unknown,
>(
  body: TBody,
) {
  return leasesResourceAdapter.create<
    TBody,
    TResult
  >(body);
}
