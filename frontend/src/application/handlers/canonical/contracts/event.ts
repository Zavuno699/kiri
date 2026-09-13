export interface ApplicationEvent<
  TPayload = unknown,
> {
  type: string;
  payload: TPayload;
  eventId: string;
  occurredAt: string;
  correlationId?: string | null;
  causationId?: string | null;
}
