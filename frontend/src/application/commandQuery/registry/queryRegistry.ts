import type {
  QueryDefinition,
} from "../contracts/queryDefinition";

const queries = new Map<
  string,
  QueryDefinition
>();

export function registerQuery(
  query: QueryDefinition,
): void {
  queries.set(
    query.id,
    query,
  );
}

export function getQuery(
  queryId: string,
): QueryDefinition | null {
  return (
    queries.get(queryId) ??
    null
  );
}

export function listQueries(): QueryDefinition[] {
  return [
    ...queries.values(),
  ];
}

export function listQueriesByDomain(
  domain: string,
): QueryDefinition[] {
  return listQueries().filter(
    (query) =>
      query.domain ===
      domain,
  );
}
