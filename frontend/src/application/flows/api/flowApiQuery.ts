import {
  projectApiQuery,
} from "../../api/projection/projectApiQuery";

export async function flowApiQuery<
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
