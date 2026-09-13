import {
  projectApiQuery,
} from "../projection/projectApiQuery";

export async function convergeApiResource<
  TResult = unknown,
>(
  domain: string,
  resourceKey: string,
  query: unknown,
): Promise<TResult> {
  return projectApiQuery<TResult>(
    domain,
    resourceKey,
    query,
  );
}
