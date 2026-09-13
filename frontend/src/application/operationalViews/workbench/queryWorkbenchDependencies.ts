import {
  selectEntityDependencies,
} from "../selectors/selectEntityDependencies";

export function queryWorkbenchDependencies(
  domain: string,
) {
  return selectEntityDependencies(
    domain,
  );
}
