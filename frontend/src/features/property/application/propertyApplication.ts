export interface PropertyApplication {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown>
}
