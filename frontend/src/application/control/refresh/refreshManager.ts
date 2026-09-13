export interface RefreshManager {
  refresh(key: string): Promise<void>
}

export function createRefreshManager(
  refresh: (key: string) => Promise<unknown>,
): RefreshManager {
  return {
    async refresh(key) {
      await refresh(key)
    },
  }
}
