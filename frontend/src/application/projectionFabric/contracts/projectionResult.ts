export interface ProjectionResult {
  projectionId: string;
  eventId: string;
  success: boolean;
  materializedEntityId: string | null;
  version: number;
  stale: boolean;
  message: string;
}
