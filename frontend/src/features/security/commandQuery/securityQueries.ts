import {
  selectQueriesForDomain,
} from "../../../application/commandQuery/selectors/selectQueriesForDomain";

export function getSecurityQueries() {
  return selectQueriesForDomain(
    "security",
  );
}
