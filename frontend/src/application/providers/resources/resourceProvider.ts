export interface ResourceProvider<T = unknown> {
  get(id: string): Promise<T | undefined>
  list(): Promise<T[]>
}
