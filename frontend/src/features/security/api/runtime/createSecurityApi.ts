import {
  securityResourceAdapter,
} from "../canonical/securityResourceAdapter";

export async function createSecurityApi<
  TBody = unknown,
  TResult = unknown,
>(
  body: TBody,
) {
  return securityResourceAdapter.create<
    TBody,
    TResult
  >(body);
}
