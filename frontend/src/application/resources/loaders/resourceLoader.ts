export interface ResourceLoader<T> {
  load(): Promise<T>
}
