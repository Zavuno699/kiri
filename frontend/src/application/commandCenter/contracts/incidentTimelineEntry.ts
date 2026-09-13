export interface IncidentTimelineEntry {
  id: string;
  incidentId: string;
  action: string;
  actorId: string | null;
  occurredAt: string;
  details: string | null;
}
