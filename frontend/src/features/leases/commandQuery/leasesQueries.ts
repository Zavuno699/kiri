import {
  selectQueriesForDomain,
} from "../../../application/commandQuery/selectors/selectQueriesForDomain";

export function getLeasesQueries() {
  return selectQueriesForDomain(
    "leases",
  );
}
