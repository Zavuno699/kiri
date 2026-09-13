import {
  listEvents,
} from "../registry/eventRegistry";

export function selectEventDefinitions(
  domain?: string,
) {
  return listEvents().filter(
    (event) =>
      !domain ||
      event.domain ===
        domain,
  );
}
