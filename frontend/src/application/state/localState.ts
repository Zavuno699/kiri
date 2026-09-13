export interface LocalState<T> {
  value: T
  version: number
  updatedAt: string
}

export function createLocalState<T>(
  value: T,
): LocalState<T> {
  return {
    value,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
