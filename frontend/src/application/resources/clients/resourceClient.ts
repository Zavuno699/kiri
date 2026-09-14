export interface ResourceClient<T = unknown> {
  list(): Promise<T[]>
  get(id: string): Promise<T | undefined>
  create?(value: Partial<T>): Promise<T>
  update?(id: string, value: Partial<T>): Promise<T>
  remove?(id: string): Promise<void>
  execute?<R>(request: ResourceRequest): Promise<ResourceResponse<R>>
}

export interface ResourceRequest {
  type: string
  payload?: unknown
}

export interface ResourceResponse<T = unknown> {
  data: T
  error?: string
  status?: number
  ok?: boolean
}

export interface ResourceClientAny {
  list(): Promise<unknown[]>
  get(id: string): Promise<unknown | undefined>
  create?(value: Partial<unknown>): Promise<unknown>
  update?(id: string, value: Partial<unknown>): Promise<unknown>
  remove?(id: string): Promise<void>
  execute?<R>(request: ResourceRequest): Promise<ResourceResponse<R>>
}
