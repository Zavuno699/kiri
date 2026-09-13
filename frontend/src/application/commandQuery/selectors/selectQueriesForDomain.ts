import {
  listQueriesByDomain,
} from "../registry/queryRegistry";

export function selectQueriesForDomain(
  domain: string,
) {
  return [
    ...listQueriesByDomain(
      domain,
    ),
    ...listQueriesByDomain(
      "global",
    ),
  ];
}
