export interface LockApplication {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown>
  execute(
    command: unknown,
  ): Promise<never>
}
