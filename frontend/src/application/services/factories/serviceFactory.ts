export type ServiceFactory<T> = () => T

const factories =
  new Map<string, ServiceFactory<any>>()

export function registerServiceFactory<T>(
  key: string,
  factory: ServiceFactory<T>,
): void {
  factories.set(key, factory)
}

export function resolveService<T>(
  key: string,
): T {
  const factory = factories.get(key)

  if (!factory) {
    throw new Error(
      `Service factory not registered: ${key}`,
    )
  }

  return factory() as T
}
