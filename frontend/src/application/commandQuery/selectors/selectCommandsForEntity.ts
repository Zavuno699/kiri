import {
  listCommandsByDomain,
} from "../registry/commandRegistry";

export function selectCommandsForEntity(
  domain: string,
) {
  return listCommandsByDomain(
    domain,
  );
}
