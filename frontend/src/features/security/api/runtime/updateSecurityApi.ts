import {
  securityResourceAdapter,
} from "../canonical/securityResourceAdapter";

export async function updateSecurityApi<
  TBody = unknown,
  TResult = unknown,
>(
  id: string,
  body: TBody,
) {
  return securityResourceAdapter.update<
    TBody,
    TResult
  >(
    id,
    body,
  );
}
