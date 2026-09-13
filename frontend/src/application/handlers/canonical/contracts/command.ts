export interface Command<
  TPayload = unknown,
> {
  type: string;
  payload: TPayload;
  correlationId?: string | null;
  causationId?: string | null;
}
