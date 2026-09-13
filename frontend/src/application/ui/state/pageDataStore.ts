export interface PageDataEntry<T = unknown> {
  pageId: string
  data: T | null
  loading: boolean
  error: string | null
}

const entries = new Map<string, PageDataEntry<unknown>>()

export function setPageData<T>(
  entry: PageDataEntry<T>,
): PageDataEntry<T> {
  entries.set(entry.pageId, entry as PageDataEntry<unknown>)
  return entry
}

export function getPageData<T>(
  pageId: string,
): PageDataEntry<T> | undefined {
  return entries.get(pageId) as PageDataEntry<T> | undefined
}
