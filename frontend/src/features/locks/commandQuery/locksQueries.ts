import {
  selectQueriesForDomain,
} from "../../../application/commandQuery/selectors/selectQueriesForDomain";

export function getLocksQueries() {
  return selectQueriesForDomain(
    "locks",
  );
}
