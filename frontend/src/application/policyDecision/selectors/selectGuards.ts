import {
  listGuards,
} from "../guards/guardRegistry";

export function selectGuards(
  domain?: string,
) {
  return listGuards().filter(
    (guard) =>
      !domain ||
      guard.domain ===
        domain,
  );
}
