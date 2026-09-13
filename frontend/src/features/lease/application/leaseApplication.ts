export interface LeaseApplication {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown>
}
