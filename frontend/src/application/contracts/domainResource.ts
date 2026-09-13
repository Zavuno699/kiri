import type { ResourceState } from "./resourceState"

export interface DomainResource<T> {
  readonly key: string
  state: ResourceState<T>
  readonly refreshable: boolean
  readonly commandable: boolean
}
