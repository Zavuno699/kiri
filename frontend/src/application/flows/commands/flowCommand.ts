export interface FlowCommand<TPayload = unknown> {
  type: string
  payload: TPayload
}

export async function flowCommand<TPayload = unknown, TResult = unknown>(
  command: FlowCommand<TPayload>,
  _domain: string,
): Promise<TResult> {
  // Mock implementation - in real system this would execute the command
  return command.payload as unknown as TResult;
}
