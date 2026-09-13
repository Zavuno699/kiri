export interface Provider {
  readonly name: string
  readonly available: boolean
}

export interface ProviderOperation<
  TRequest,
  TResponse,
> {
  execute(
    request: TRequest,
  ): Promise<TResponse>
}
