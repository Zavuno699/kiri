import type { ResourceClient } from "./resourceClient"

export function createResourceDetailClient<T>(
  client: ResourceClient<T>,
): ResourceClient<T> {
  return client
}
