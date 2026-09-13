export interface EventTimelineItem {
  id: string;
  eventType: string;
  domain: string;
  label: string;
  timestamp: string;
  aggregateId: string | null;
  correlationId: string | null;
  status:
    | "observed"
    | "acknowledged"
    | "projected"
    | "unprojected";
}
