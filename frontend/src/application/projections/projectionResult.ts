export interface ProjectionResult<T> {
  changed: boolean
  value: T
  version: number
}
