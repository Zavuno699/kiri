import type {
  IncidentTimelineEntry,
} from "../contracts/incidentTimelineEntry";

const entries:
  IncidentTimelineEntry[] = [];

export function recordIncidentTimeline(
  entry: IncidentTimelineEntry,
): void {
  entries.push(entry);

  if (
    entries.length >
    1000
  ) {
    entries.shift();
  }
}

export function listIncidentTimeline(
  incidentId?: string,
): IncidentTimelineEntry[] {
  return entries.filter(
    (entry) =>
      !incidentId ||
      entry.incidentId ===
        incidentId,
  );
}
