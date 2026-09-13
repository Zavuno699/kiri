export interface Repository<T> {
  list(): Promise<T[]>
  get(id: string): Promise<T | undefined>
}

export interface MutableRepository<T> extends Repository<T> {
  save(value: T): Promise<void>
  remove(id: string): Promise<void>
}
