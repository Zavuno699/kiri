export interface ReconciliationStrategy<T> {
  id: string
  compare(
    expected: T,
    actual: T,
  ): string[]
}
