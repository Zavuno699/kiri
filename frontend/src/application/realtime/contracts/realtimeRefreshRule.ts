export interface RealtimeRefreshRule {
  key: string;
  domain: string;
  resourceKey: string;
  eventTypes: string[];
  invalidatePersistence: boolean;
  refreshProjection: boolean;
  refreshDependents: boolean;
}
