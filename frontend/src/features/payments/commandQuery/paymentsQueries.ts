import {
  selectQueriesForDomain,
} from "../../../application/commandQuery/selectors/selectQueriesForDomain";

export function getPaymentsQueries() {
  return selectQueriesForDomain(
    "payments",
  );
}
