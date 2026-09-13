import {
  listProjectionsForEvent,
} from "../traceability/eventProjectionRegistry";

export function selectEventProjectionTrace(
  eventType: string,
) {
  return listProjectionsForEvent(
    eventType,
  );
}
