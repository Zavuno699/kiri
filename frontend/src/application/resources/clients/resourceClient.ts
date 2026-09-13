export interface ResourceClient<T = unknown> {
  list(): Promise<T[]>
  get(id: string): Promise<T | undefined>
  create?(value: Partial<T>): Promise<T>
  update?(id: string, value: Partial<T>): Promise<T>
  remove?(id: string): Promise<void>
}
