import {
  listProjections,
} from "../registry/projectionRegistry";

export function selectEventProjections(
  domain?: string,
) {
  return listProjections().filter(
    (projection) =>
      !domain ||
      projection.domain ===
        domain,
  );
}
