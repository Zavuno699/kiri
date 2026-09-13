export interface DomainService<TList, TDetail> {
  list(params?: unknown): Promise<TList>
  get(id: string): Promise<TDetail>
}
