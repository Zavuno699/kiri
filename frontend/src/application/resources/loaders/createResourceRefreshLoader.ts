import type { ResourceRefreshLoader } from "./resourceRefreshLoader"

export function createResourceRefreshLoader<T>(
  load: () => Promise<T>,
  refresh?: () => Promise<T>,
): ResourceRefreshLoader<T> {
  return {
    load,
    refresh:
      refresh ??
      (async () => load()),
  }
}
