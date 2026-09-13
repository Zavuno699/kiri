import { setPageData } from "../state/pageDataStore"
import { setPageRuntimeState } from "../state/pageRuntimeStore"

export async function loadDomainPage<T>(
  pageId: string,
  loader: () => Promise<T>,
): Promise<T> {
  setPageRuntimeState({
    pageId,
    loading: true,
    ready: false,
    stale: false,
    error: null,
  })

  try {
    const data = await loader()

    setPageData({
      pageId,
      data,
      loading: false,
      error: null,
    })

    setPageRuntimeState({
      pageId,
      loading: false,
      ready: true,
      stale: false,
      error: null,
    })

    return data
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error)

    setPageRuntimeState({
      pageId,
      loading: false,
      ready: false,
      stale: false,
      error: message,
    })

    throw error
  }
}
