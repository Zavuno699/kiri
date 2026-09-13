import type { ResourceClient } from "./resourceClient"

export function createResourceCollectionClient<T>(
  client: ResourceClient<T>,
): ResourceClient<T> {
  return client
}
