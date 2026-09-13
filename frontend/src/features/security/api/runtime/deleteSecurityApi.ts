import {
  securityResourceAdapter,
} from "../canonical/securityResourceAdapter";

export async function deleteSecurityApi<
  TResult = unknown,
>(
  id: string,
) {
  return securityResourceAdapter.remove<TResult>(
    id,
  );
}
