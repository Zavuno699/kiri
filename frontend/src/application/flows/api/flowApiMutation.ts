export interface FlowApiMutation<TPayload = unknown, TResult = unknown> {
  type: string
  mutate(
    payload: TPayload,
  ): Promise<TResult> | TResult
}
