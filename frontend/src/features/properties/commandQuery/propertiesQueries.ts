import {
  selectQueriesForDomain,
} from "../../../application/commandQuery/selectors/selectQueriesForDomain";

export function getPropertiesQueries() {
  return selectQueriesForDomain(
    "properties",
  );
}
