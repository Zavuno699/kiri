export interface RealtimeSubscription {
  key: string;
  domain: string;
  resourceKey: string;
  eventTypes: string[];
  enabled: boolean;
}
