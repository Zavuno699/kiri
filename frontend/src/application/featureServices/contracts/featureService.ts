export interface FeatureServiceContext {
  principal: string | null;
  sessionId: string | null;
  correlationId: string | null;
}

export interface FeatureService<
  TList = unknown,
  TItem = unknown,
  TCreate = unknown,
  TUpdate = unknown,
  TCommand = unknown,
  TResult = unknown,
> {
  list(
    context?: FeatureServiceContext,
  ): Promise<TList>;

  get(
    id: string,
    context?: FeatureServiceContext,
  ): Promise<TItem>;

  create?(
    input: TCreate,
    context?: FeatureServiceContext,
  ): Promise<TItem>;

  update?(
    id: string,
    input: TUpdate,
    context?: FeatureServiceContext,
  ): Promise<TItem>;

  command?(
    input: TCommand,
    context?: FeatureServiceContext,
  ): Promise<TResult>;
}
