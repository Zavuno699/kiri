export interface LeaseRefreshHandler {
  execute(): Promise<void>
}

export function createLeaseRefreshHandler(
  refresh: () => Promise<unknown>,
): LeaseRefreshHandler {
  return {
    async execute() {
      await refresh()
    },
  }
}
