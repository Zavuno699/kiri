export interface SecurityRefreshOperation {
  execute(): Promise<void>
}

export function createSecurityRefreshOperation(
  refresh: () => Promise<unknown>,
): SecurityRefreshOperation {
  return {
    async execute() {
      await refresh()
    },
  }
}
