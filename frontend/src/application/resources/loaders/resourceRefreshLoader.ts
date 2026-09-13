export interface ResourceRefreshLoader<T> {
  load(): Promise<T>
  refresh(): Promise<T>
}
