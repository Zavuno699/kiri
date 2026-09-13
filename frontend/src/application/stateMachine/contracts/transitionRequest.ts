export interface TransitionRequest {
  domain: string;
  entityId: string;
  transitionId: string;
  currentState: string;
  subjectId: string | null;
  confirmed: boolean;
  context: Record<string, unknown>;
  correlationId: string;
}
