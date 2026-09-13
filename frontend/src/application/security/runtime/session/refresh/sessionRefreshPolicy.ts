export interface SessionRefreshPolicy {
  enabled: boolean;
  minimumIntervalSeconds: number;
  refreshWindowSeconds: number;
}

export const defaultSessionRefreshPolicy: SessionRefreshPolicy = {
  enabled: true,
  minimumIntervalSeconds: 30,
  refreshWindowSeconds: 300,
};
