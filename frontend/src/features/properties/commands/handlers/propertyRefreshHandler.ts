export interface PropertyRefreshHandler {
  execute(): Promise<void>
}

export function createPropertyRefreshHandler(
  refresh: () => Promise<unknown>,
): PropertyRefreshHandler {
  return {
    async execute() {
      await refresh()
    },
  }
}
