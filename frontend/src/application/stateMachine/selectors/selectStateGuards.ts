import {
  listGuardsByDomain,
} from "../guards/guardRegistry";

export function selectStateGuards(
  domain: string,
) {
  return listGuardsByDomain(
    domain,
  );
}
