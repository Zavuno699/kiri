import {
  listInvariantsByDomain,
} from "../invariants/invariantRegistry";

export function selectStateInvariants(
  domain: string,
) {
  return listInvariantsByDomain(
    domain,
  );
}
