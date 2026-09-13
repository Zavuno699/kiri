export interface ApplicationFlowContext {
  flowId: string;
  domain: string;
  resourceKey: string;
  correlationId: string | null;
  causationId: string | null;
  startedAt: string;
}

export interface ApplicationFlow<TInput = unknown, TResult = unknown> {
  key: string;
  execute(
    input: TInput,
    context: ApplicationFlowContext,
  ): Promise<TResult>;
}
