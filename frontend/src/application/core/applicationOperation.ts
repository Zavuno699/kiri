export interface ApplicationOperation<T> {
  execute(): Promise<T>
}

export function operation<T>(
  execute: () => Promise<T>,
): ApplicationOperation<T> {
  return {
    execute,
  }
}
