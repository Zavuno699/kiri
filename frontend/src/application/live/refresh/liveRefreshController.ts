export interface LiveRefreshController {
  request(
    key: string,
    refresh: () => Promise<unknown>,
  ): Promise<void>
}

export function createLiveRefreshController():
  LiveRefreshController {
  return {
    async request(_key, refresh) {
      await refresh()
    },
  }
}
