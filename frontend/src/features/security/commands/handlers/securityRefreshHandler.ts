export interface SecurityRefreshHandler {
  execute(): Promise<void>
}

export function createSecurityRefreshHandler(
  refresh: () => Promise<unknown>,
): SecurityRefreshHandler {
  return {
    async execute() {
      await refresh()
    },
  }
}
