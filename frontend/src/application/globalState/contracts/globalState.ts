export interface GlobalState {
  initialized: boolean;
  operational: boolean;
  degraded: boolean;
  activeDomain: string | null;
  activeRoute: string;
  selectedResourceId: string | null;
  incidentCount: number;
  recoveryCount: number;
  lastEventId: string | null;
  lastEventType: string | null;
  version: number;
  updatedAt: string | null;
}
