export type UseCase<TInput = unknown, TResult = unknown> = (
  input: TInput,
) => Promise<TResult> | TResult

const registry =
  new Map<string, UseCase<any, any>>()

export function registerUseCase(
  key: string,
  useCase: UseCase,
): void {
  registry.set(key, useCase)
}

export function executeUseCase<
  TInput = unknown,
  TResult = unknown,
>(
  key: string,
  input: TInput,
): Promise<TResult> {
  const useCase = registry.get(key)

  if (!useCase) {
    throw new Error(
      `Use case not registered: ${key}`,
    )
  }

  return Promise.resolve(
    useCase(input),
  ) as Promise<TResult>
}
