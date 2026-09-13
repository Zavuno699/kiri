export interface ApiRequestMetric {
  method: string;
  path: string;
  status: number;
  success: boolean;
  startedAt: string;
  completedAt: string;
  durationMs: number;
}
