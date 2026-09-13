import {
  projectQueryResult,
} from "../../projections/runtime/projectQueryResult";

export async function projectApiQuery<
  T = unknown,
>(
  domain: string,
  resourceKey: string,
  query: unknown,
): Promise<T> {
  return projectQueryResult<T>(
    domain,
    resourceKey,
    query,
  );
}
