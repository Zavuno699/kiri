export interface ApplicationWorkflow<TInput = unknown, TResult = unknown> {
  key: string;

  execute(
    input: TInput,
  ): Promise<TResult>;
}
