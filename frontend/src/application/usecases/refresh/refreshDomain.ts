export interface RefreshDomainResult {
  refreshed: boolean
  updatedAt: string
}

export async function refreshDomain(
  refreshers: Array<() => Promise<unknown>>,
): Promise<RefreshDomainResult> {
  for (const refresh of refreshers) {
    await refresh()
  }

  return {
    refreshed: true,
    updatedAt: new Date().toISOString(),
  }
}
