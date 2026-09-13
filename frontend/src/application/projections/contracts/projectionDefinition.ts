import type {
  ResourceState,
} from "./resourceState";

export interface ProjectionDefinition<T = unknown> {
  key: string;
  domain: string;
  resourceKey: string;
  initialState: ResourceState<T>;
  project: (
    state: ResourceState<T>,
    payload: unknown,
  ) => ResourceState<T>;
}
