import type { ResourceLoader } from "./resourceLoader"

export function createResourceLoader<T>(
  load: () => Promise<T>,
): ResourceLoader<T> {
  return {
    load,
  }
}
