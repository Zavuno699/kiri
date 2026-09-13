export interface LeaseRefreshOperation {
  execute(): Promise<void>
}

export function createLeaseRefreshOperation(
  refresh: () => Promise<unknown>,
): LeaseRefreshOperation {
  return {
    async execute() {
      await refresh()
    },
  }
}
