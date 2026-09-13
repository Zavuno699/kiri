export interface PropertyRefreshOperation {
  execute(): Promise<void>
}

export function createPropertyRefreshOperation(
  refresh: () => Promise<unknown>,
): PropertyRefreshOperation {
  return {
    async execute() {
      await refresh()
    },
  }
}
