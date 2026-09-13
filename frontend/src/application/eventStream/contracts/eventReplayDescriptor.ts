export interface EventReplayDescriptor {
  eventId: string;
  eventType: string;
  replayable: boolean;
  requiresAuthorization: boolean;
  requiresConfirmation: boolean;
  blockedReason: string | null;
}
