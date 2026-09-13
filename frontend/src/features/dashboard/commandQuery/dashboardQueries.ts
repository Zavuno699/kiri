import {
  selectQueriesForDomain,
} from "../../../application/commandQuery/selectors/selectQueriesForDomain";

export function getDashboardQueries() {
  return selectQueriesForDomain(
    "dashboard",
  );
}
