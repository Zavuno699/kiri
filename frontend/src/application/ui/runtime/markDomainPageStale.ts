import {
  getPageData,
  setPageData,
} from "../state/pageDataStore"

export function markDomainPageStale(pageId: string) {
  const current = getPageData(pageId)

  return setPageData({
    pageId,
    data: current?.data ?? null,
    loading: current?.loading ?? false,
    error: current?.error ?? null,
  })
}
