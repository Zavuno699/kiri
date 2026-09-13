import {
  selectQueriesForDomain,
} from "../../../application/commandQuery/selectors/selectQueriesForDomain";

export function getDevicesQueries() {
  return selectQueriesForDomain(
    "devices",
  );
}
