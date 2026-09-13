import {
  securityResourceAdapter,
} from "../canonical/securityResourceAdapter";

export async function getSecurityApi<T = unknown>(
  id: string,
) {
  return securityResourceAdapter.get<T>(
    id,
  );
}
